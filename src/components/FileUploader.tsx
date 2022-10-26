import React, { useEffect, useState, useContext } from "react";
import { AxiosProgressEvent } from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import UserContext from "../services/UserContext";

interface Props {
  file: File;
  onUploadComplete: () => void
}

const FileUploader: React.FC<Props> = ({ file, onUploadComplete }) => {
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const currentUser = useContext(UserContext);

  const uploadProgress = (evt: AxiosProgressEvent) => {
    setProgress(
      evt.total ? (evt.loaded / evt.total) * 100 : undefined
    );
  };

  const formData = new FormData();
  formData.append("file", file);

  const [{ data, loading, error }, executeUpload] = currentUser!.useAxios(
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
