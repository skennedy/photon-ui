import React, { useEffect, useState } from "react";
import { AxiosProgressEvent } from "axios";
import { useAxios } from "../App";
import LinearProgress from "@mui/material/LinearProgress";

interface Props {
  file: File;
  onUploadComplete: () => void
}

const FileUploader: React.FC<Props> = ({ file, onUploadComplete }) => {
  const [progress, setProgress] = useState<number | undefined>(undefined);

  const uploadProgress = (evt: AxiosProgressEvent) => {
    setProgress(
      evt.total ? (evt.loaded / evt.total) * 100 : undefined
    );
  };

  const formData = new FormData();
  formData.append("file", file);

  const [{ data, loading, error }, executeUpload] = useAxios(
    {
      url: "/uploads",
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
      <LinearProgress variant={{loading} ? "determinate" : "indeterminate"} value={progress} />
  );
};

export default FileUploader;
