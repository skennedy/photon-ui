import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import { CollectionItem, ProgressBar } from "react-materialize";

interface Props {
  file: File;
  onUploadComplete: () => void
}

const FileUploader: React.FC<Props> = ({ file, onUploadComplete }) => {
  const [progress, setProgress] = useState<number | undefined>(undefined);

  const uploadProgress = (evt: ProgressEvent) => {
    setProgress(
      evt.lengthComputable ? (evt.loaded / evt.total) * 100 : undefined
    );
  };

  const formData = new FormData();
  formData.append("file", file);

  const [{ data, loading, error }, executeUpload] = useAxios(
    {
      url: "http://localhost:8080/uploads",
      method: "POST",
      data: formData,
      onUploadProgress: uploadProgress
    }, { useCache: false}
  );

  useEffect(() => {
      if (!loading) {
          onUploadComplete()
      }
  }, [loading]);

  return (
      <ProgressBar progress={(!loading) ? 100 : progress} />
  );
};

export default FileUploader;
