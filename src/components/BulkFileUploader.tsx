import React, {useContext, useState, useMemo} from "react";
import FileUploader from "./FileUploader";
import UserContext from "../services/UserContext";

interface Props {
    files: File[];
}

const MaxUploads = 3;

interface FilesState {
    [index: number]: {
        state: 'pending' | 'uploading' | 'done';
        error?: string;
    }

    nextUploadingIndex: number
}

const initialFileStates = (files: File[]) => () => {
    return {
        ...Array.from(new Array(files.length), (_, idx) => (idx < MaxUploads) ? {state: 'uploading'} : {state: 'pending'}),
        nextUploadingIndex: MaxUploads
    };
};

const BulkFileUploader: React.FC<Props> = ({files}) => {
    const [fileStates, setFileStates] = useState<FilesState>(initialFileStates(files));
    const currentUser = useContext(UserContext);

    const uploadComplete = (idx: number, error: string | undefined) => {
        setFileStates(fileStates => {
            const updated: FilesState = {...fileStates, [idx]: {state: 'done', error}};

            if (fileStates.nextUploadingIndex === files.length)
                return updated;
            else
                return {
                    ...updated,
                    [fileStates.nextUploadingIndex]: {state: 'uploading'},
                    nextUploadingIndex: fileStates.nextUploadingIndex + 1
                };
        });
    };

    const payload = useMemo(() => ({ name: new Date().toISOString() }), []);

    const [{data: uploadId, loading, error}] = currentUser!.useAxios<string>(
        {
            url: `/upload-sources`,
            method: "POST",
            data: payload,
        }
    );

    const fileComponent = (file: File, idx: number) => {
        if (fileStates[idx].state === 'uploading') {
            return <li key={idx}>
                {file.name}
                <FileUploader
                    uploadId={uploadId!}
                    file={file}
                    onUploadComplete={() => uploadComplete(idx, undefined)}
                    onUploadFailed={(e) => uploadComplete(idx, e.response!.data)}
                />
            </li>;
        } else {
            return <li key={idx}>
                {file.name + ((fileStates[idx].error) ? `: ${fileStates[idx].error}` : "")}
            </li>;
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {files.map((file, idx) => fileComponent(file, idx))}
            </ul>
        );
    }
};

export default BulkFileUploader;
