import React, {useCallback, useContext, useEffect, useState, useMemo, useRef} from "react";
import {AxiosError, AxiosProgressEvent} from 'axios';
import {useDropzone} from "react-dropzone";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Paper from "@mui/material/Paper"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Typography from "@mui/material/Typography"
import LinearProgress from "@mui/material/LinearProgress"
import CloudUploadSharpIcon from '@mui/icons-material/CloudUploadSharp';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import UserContext from "../services/UserContext";

interface UploadedFileResp {
    id: string
    createdAt: string
    mediaSourceId: string
    originalFileName: string
    status: CreatedStatus | StoredStatus | FailedStatus
}

type CreatedStatus = { type: "Created", path: string }
type StoredStatus = { type: "Stored", mediaFileId: string }
type FailedStatus = { type: "Failed", error: string }

interface FailedFile {
    file: File
    reason: string
}

interface UseFileUploader {
    progress?: number
    currentFile?: File
}

const useFileUploader = (uploadId: string, files: File[], onUploadSucceeded: (file: File) => void, onUploadFailed: (file: FailedFile) => void): UseFileUploader => {
    const currentUser = useContext(UserContext);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentBytesDone, setCurrentBytesDone] = useState<number>(0);
    const socketRef = useRef<WebSocket | null>(null);
    const uploadIdToIndexRef = useRef<{ [uploadId: string]: number }>({});

    const pushUploadIdIndex = (uploadId: string, index: number) => {
        uploadIdToIndexRef.current = {...uploadIdToIndexRef.current, [uploadId]: index}
    }

    const popUploadIdIndex = (uploadId: string) => {
        const {[uploadId]: index, ...rest} = uploadIdToIndexRef.current;
        uploadIdToIndexRef.current = rest;
        return index;
    }

    useEffect(() => {

        let cancelled = false;

        const uploadFile = (index: number): Promise<any> => {
            setCurrentIndex(index);
            setCurrentBytesDone(0);
            if (index < files.length) {
                const file = files[index];
                console.log(file);

                return currentUser!.axios<UploadedFileResp>({
                    url: `/upload-sources/${uploadId}/files`,
                    method: "POST",
                    data: file,
                    headers: {
                        'Content-Type': file.type,
                        'X-FilePath': (file as any).path,
                    },
                    onUploadProgress: (evt: AxiosProgressEvent) => {
                        setCurrentBytesDone(evt.loaded);
                    },
                }).then((resp) => {
                    pushUploadIdIndex(resp.data.id, currentIndex)
                    if (cancelled) {
                        return Promise.resolve();
                    }
                    return uploadFile(index + 1);
                }).catch((e: AxiosError<string, any>) => {
                    // TODO: retry logic because this should only be network errors?
                    const reason = (e.response) ? e.response.data : ((e.message) ? e.message : "Unknown error");
                    onUploadFailed({file, reason});
                    if (cancelled) {
                        return Promise.resolve();
                    }
                    return uploadFile(index + 1);
                });
            } else {
                return Promise.resolve();
            }
        }

        uploadFile(0);

        return () => {
            cancelled = true
        };

    }, [uploadId, files, currentUser, currentIndex, onUploadSucceeded, onUploadFailed]);

    useEffect(() => {

        socketRef.current = new WebSocket(`ws://localhost:8080/upload-sources/${uploadId}/status`);

        return () => {
            socketRef.current!.close();
            socketRef.current = null;
        };

    }, [uploadId]);


    useEffect(() => {
        let onMessage = (evt: MessageEvent) => {
            const msg: UploadedFileResp = JSON.parse(evt.data);
            const uploadId = msg.id;
            console.log(msg);

            switch (msg.status.type) {
                case "Created":
                    break;
                case "Stored":
                    onUploadSucceeded(files[popUploadIdIndex(uploadId)]);
                    break;
                case "Failed":
                    onUploadFailed({file: files[popUploadIdIndex(uploadId)], reason: msg.status.error});
                    break;
            }
        };
        socketRef.current!.addEventListener('message', onMessage);

        return () => {
            if (socketRef.current) {
                socketRef.current.removeEventListener('message', onMessage)
            }
        };
    }, [files, onUploadSucceeded, onUploadFailed]);

    const accumulatedFileSizes = useMemo(() => files.reduce<number[]>((acc, f, idx) => [...acc, (idx === 0) ? f.size : acc[idx - 1] + f.size], []), [files]);
    const doneBytes = (currentIndex > 0) ? accumulatedFileSizes[currentIndex - 1] : 0;
    const totalBytes = (accumulatedFileSizes.length > 0) ? accumulatedFileSizes[accumulatedFileSizes.length - 1] : 0;
    const progress = (totalBytes > 0) ? (doneBytes + currentBytesDone) / totalBytes * 100.0 : undefined;
    // console.log({currentIndex, currentBytesDone, doneBytes, totalBytes, progress})
    const currentFile = currentIndex < files.length ? files[currentIndex] : undefined;

    return {progress, currentFile};

}

const UploadSession: React.FC = () => {
    const {uploadId} = useParams();
    const [succeeded, setSucceeded] = useState<File[]>([]);
    const [failed, setFailed] = useState<FailedFile[]>([]);
    const onUploadSucceeded = useCallback((file: File) => {
        setSucceeded((existing) => [...existing, file]);
    }, [setSucceeded]);
    const onUploadFailed = useCallback((file: FailedFile) => {
        setFailed((existing) => [...existing, file]);
    }, [setFailed])

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

    const {progress, currentFile} = useFileUploader(uploadId, acceptedFiles, onUploadSucceeded, onUploadFailed);

    return (<>

            {currentFile &&
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography component="p" variant="h5">
                        Transferring...
                    </Typography>
                    <LinearProgress variant="determinate" value={progress}/>
                    <Typography>{currentFile.name}</Typography>

                </Paper>
            }

            {succeeded.length > 0 &&
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                    >
                        <Typography>✅ {succeeded.length} Files</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {succeeded.map((f, idx) => (
                                <ListItem key={idx}>{(f as any).path}</ListItem>))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            }

            {failed.length > 0 &&
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                    >
                        <Typography>❌ {failed.length} Files</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {failed.map(({file, reason}, idx) => (
                                <ListItem key={idx}>{`${(file as any).path} - ${reason}`}</ListItem>))}
                        </List>
                    </AccordionDetails>
                </Accordion>}

            {!currentFile &&
                <Box {...getRootProps()}>
                    <Card>
                        <Button size="large">
                            Drop files here
                            <CloudUploadSharpIcon>cloud</CloudUploadSharpIcon>
                            <input type="file" multiple {...getInputProps()} />
                        </Button>
                    </Card>
                </Box>
            }
        </>
    )
};

export default UploadSession;
