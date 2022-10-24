import React, {useState} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FileUploader from "./FileUploader";

interface Props {
    files: File[];
}

const MaxUploads = 3;

const BulkFileUploader: React.FC<Props> = ({files}) => {
    const [uploadingCap, setUploadingCap] = useState<number>(MaxUploads);

    const uploadComplete = (idx: number) => {
        console.log(`index: ${idx} new cap ${uploadingCap + 1}`);
        setUploadingCap(uploadingCap + 1);
    };

    return (
        <List>
            {files.map((file, idx) => (
                <ListItem key={idx}>
                    {file.name}
                    {idx < uploadingCap ? (
                        <FileUploader
                            file={file}
                            onUploadComplete={() => uploadComplete(idx)}
                        />
                    ) : null}
                </ListItem>
            ))}
        </List>
    );
};

export default BulkFileUploader;
