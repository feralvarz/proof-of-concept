import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { getFileName } from "../../util/helpers";
import { ILoadedFile } from "../../util/types";
import "./Dropzone.css";

export const DropZone = ({ callback }: { callback: Function }) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/jpeg, image/png",
  });

  useEffect(() => {
    if (acceptedFiles.length) {
      const file: File = acceptedFiles[0];
      const sizeInMb = file.size / 1e6;
      const fileName: string | null = getFileName(file.name);
      if (fileName && sizeInMb <= 5) {
        const loadedFile: ILoadedFile = {
          name: fileName,
          url: URL.createObjectURL(file),
        };

        // Updates file for CropBox
        callback(loadedFile);
      }
    }
  }, [acceptedFiles]);

  return (
    <div className="col col-md-6 mx-auto">
      <div
        {...getRootProps({
          className: `${isDragActive ? "dropzone active" : "dropzone"}`,
        })}
      >
        <input {...getInputProps()} />
        {isDragAccept && <p className="mb-0">Drop your file here</p>}
        {!isDragActive && (
          <p className="mb-0">Drag and drop or click here to Load your file</p>
        )}
      </div>
    </div>
  );
};
