import React from "react";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Icon from "@mui/material/Icon"
import BulkFileUploader from "./BulkFileUploader";
import CloudUploadSharpIcon from '@mui/icons-material/CloudUploadSharp';

const Dropzone: React.FC  = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const dropzone = (
    <Box {...getRootProps()}>
      <Card>
        <Button size="large">
          Drop files here
          <CloudUploadSharpIcon>cloud</CloudUploadSharpIcon>
          <input type="file" multiple {...getInputProps()} />
        </Button>
      </Card>
    </Box>
  );

  return acceptedFiles.length > 0 ? <BulkFileUploader files={acceptedFiles}/> : dropzone;
};

export default Dropzone;
