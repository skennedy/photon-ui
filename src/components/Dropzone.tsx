import React from "react";
import { useDropzone } from "react-dropzone";
import { Button, Icon, Row, Collection, CardPanel } from "react-materialize";
import FileUploader from "./FileUploader";
import BulkFileUploader from "./BulkFileUploader";

const Dropzone: React.FC  = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const dropzone = (
    <Row {...getRootProps()}>
      <CardPanel>
        <Button waves="light" large>
          Drop files here
          <Icon right>cloud</Icon>
          <input type="file" multiple {...getInputProps()} />
        </Button>
      </CardPanel>
    </Row>
  );

  return acceptedFiles.length > 0 ? <BulkFileUploader files={acceptedFiles}/> : dropzone;
};

export default Dropzone;
