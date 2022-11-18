import React, {useContext, useEffect, useState} from "react";
import {AxiosError, AxiosProgressEvent} from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import UserContext from "../services/UserContext";

interface Props {
    uploadId: string;
    file: File;
    onUploadComplete: () => void
    onUploadFailed: (e: AxiosError<string, any>) => void
}

const FileUploader: React.FC<Props> = ({uploadId, file, onUploadComplete, onUploadFailed}) => {
    const [progress, setProgress] = useState<number>(0);
    const currentUser = useContext(UserContext);

    const uploadProgress = (evt: AxiosProgressEvent) => {
        setProgress(
            evt.total ? (evt.loaded / evt.total) * 100 : 0
        );
    };

    useEffect(() => {
        const formData = new FormData();
        formData.append("file", file);

        currentUser!.axios({
            url: `/upload-sources/${uploadId}/files`,
            method: "POST",
            data: formData,
            onUploadProgress: uploadProgress
        }).then(() => {
            setProgress(100);
            onUploadComplete();
        }).catch((e: AxiosError<string, any>) => {
            setProgress(100);
            onUploadFailed(e);
        });
    }, []);

    return (
        <LinearProgress variant="determinate" value={progress}/>
    );
};

export default FileUploader;
