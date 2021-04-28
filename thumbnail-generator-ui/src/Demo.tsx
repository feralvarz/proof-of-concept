import React, { useCallback, useEffect, useRef, useState } from "react";
import { Cropper as CropBox } from "react-cropper";
import "cropperjs/dist/cropper.css";
import _, { delay } from "lodash";
import { getThumbnailUrls, storage } from "./firebaseApp";
import { useDropzone } from "react-dropzone";
import { ProgressBar } from "react-bootstrap";
import { IThumbnailSize } from "./util/types";

/**
 *
 * @param file
 * @param fileName
 * @param loadCallback
 */
const uploadFile = (
  file: Blob,
  fileName: string,
  loadCallback: Function,
  completeCallback: Function
) => {
  const uploadTask = storage.ref().child(`img/${fileName}.jpeg`).put(file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      let progress = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log("Upload is " + progress + "% done");
      loadCallback(progress);
    },
    (error) => {
      // Handle unsuccessful uploads
      console.error(error);
      //TODO: handle with setError effect
      loadCallback(false);
    },
    () => {
      // TODO: create promise from thumbnail large load.
      // await image....
      // complete callback(.... ) etc
      delay(() => completeCallback(getThumbnailUrls(fileName)), 4000);
    }
  );
};

export const Demo: React.FC = () => {
  const cropperRef = useRef<HTMLImageElement>(null);
  const [fileInfo, setFileInfo] = useState<ILoadedFile>();
  const [loading, setLoading] = useState<number | false>(false);
  const [thumbnails, setThumbnails] = useState<IThumbnailSize[]>([]);

  useEffect(() => {
    if (thumbnails.length) {
      setLoading(false);
    }
  }, [thumbnails]);

  const handleCrop = useCallback(() => {
    const imageElement: any = cropperRef?.current;
    const cropper = imageElement?.cropper;

    cropper.getCroppedCanvas().toBlob(
      (blob: Blob) => {
        if (fileInfo)
          uploadFile(blob, fileInfo.name, setLoading, setThumbnails);
        cropper.clear();
      },
      "image/jpeg",
      1
    );
  }, [fileInfo]);

  return (
    <div className="generator h-100 d-flex align-items-center">
      <div className="col col-md-6 col-lg-4 mx-auto mt-n4">
        {loading && (
          <ProgressBar className="my-4" now={loading} label={`${loading}%`} />
        )}
        {fileInfo && (
          <CropBox
            src={fileInfo.url}
            style={{ maxWidth: 900 }}
            aspectRatio={4 / 3}
            viewMode={3}
            guides={false}
            autoCrop={false}
            ref={cropperRef}
          />
        )}
        {!!thumbnails.length &&
          thumbnails.map((item, i) => {
            return (
              <div key={"item-" + i}>
                <h4>Size {item.size}</h4>
                <img src={item.url} alt={`Thumbnail image size ${item.size}`} />
              </div>
            );
          })}

        <DropZone callback={setFileInfo} />

        <button onClick={handleCrop}>Crop image</button>
      </div>
    </div>
  );
};

/**
 * Gets a file name without extension
 * @param name Name property from File object
 * @returns a file name only without extension
 */
function getFileName(name: string) {
  const re = /([^\/]+)(?=\.\w+$)/gim;
  const result = re.exec(name);

  return result && result[0];
}

export interface ILoadedFile {
  name: string;
  url: string;
}

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
    <div className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {isDragAccept && <p>All files will be accepted</p>}
        {isDragReject && <p>Some files will be rejected</p>}
        {!isDragActive && <p>Drop some files here ...</p>}
      </div>
    </div>
  );
};
