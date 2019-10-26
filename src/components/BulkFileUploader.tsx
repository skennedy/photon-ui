import React, { useState } from "react";
import {
  Collection,
  CollectionItem,
  ProgressBar,
  Row
} from "react-materialize";
import FileUploader from "./FileUploader";

interface Props {
  files: File[];
}

const MaxUploads = 3;

const BulkFileUploader: React.FC<Props> = ({ files }) => {
  const [uploadingCap, setUploadingCap] = useState<number>(MaxUploads);

  const uploadComplete = (idx: number) => {
    console.log(`index: ${idx} new cap ${uploadingCap + 1}`);
    setUploadingCap(uploadingCap + 1);
  };

  return (
    <Row>
      <Collection>
        {files.map((file, idx) => (
          <CollectionItem key={idx}>
            {file.name}
            {idx < uploadingCap ? (
              <FileUploader
                file={file}
                onUploadComplete={() => uploadComplete(idx)}
              />
            ) : null}
          </CollectionItem>
        ))}
      </Collection>
    </Row>
  );
};

export default BulkFileUploader;
