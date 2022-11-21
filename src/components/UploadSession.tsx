import React, {useCallback, useContext, useEffect, useState} from "react";
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

    useEffect(() => {

        const uploadFile = (index: number): Promise<any> => {
            setCurrentIndex(index);
            setCurrentBytesDone(0);
            if (index < files.length) {
                const file = files[index];

                return currentUser!.axios({
                    url: `/upload-sources/${uploadId}/files`,
                    method: "POST",
                    data: file,
                    headers: {
                        'Content-Type': file.type,
                        'X-FilePath': (file as any).webkitRelativePath,
                    },
                    onUploadProgress: (evt: AxiosProgressEvent) => {
                        setCurrentBytesDone(evt.loaded);
                    }
                }).then(() => {
                    onUploadSucceeded(file);
                    return uploadFile(index + 1);
                }).catch((e: AxiosError<string, any>) => {
                    const reason = (e.response) ? e.response.data : ((e.message) ? e.message : "Unknown error");
                    onUploadFailed({file, reason});
                    return uploadFile(index + 1);
                });
            } else {
                return Promise.resolve();
            }
        }

        uploadFile(0);

    }, [uploadId, files, currentUser, onUploadSucceeded, onUploadFailed]);


    const [doneBytes, totalBytes] = files.reduce(([done, total], f, idx) => [(idx < currentIndex) ? done + f.size : done, total + f.size], [0, 0]);
    const progress = (totalBytes > 0) ? (doneBytes + currentBytesDone) / totalBytes * 100.0 : undefined;
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
                            {succeeded.map((f, idx) => (<ListItem key={idx}>{(f as any).webkitRelativePath}</ListItem>))}
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
                        {failed.map(({file, reason}, idx) => (<ListItem key={idx}>{`${(file as any).webkitRelativePath} - ${reason}`}</ListItem>))}
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
