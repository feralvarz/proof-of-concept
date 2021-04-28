import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import { uploadCroppedFile } from "../../util/helpers";
import { Cropper as CropBox } from "react-cropper";
import { ILoadedFile, IThumbnailSize } from "../../util/types";
import { DropZone } from "./Dropzone";
import "cropperjs/dist/cropper.css";
import "./Resizer.css";
import { FileModal } from "../FileModal/FileModal";

export const Resizer: React.FC = () => {
  const cropperRef = useRef<HTMLImageElement>(null);
  const [fileInfo, setFileInfo] = useState<ILoadedFile>();
  const [loading, setLoading] = useState<number | false>(false);
  const [thumbnails, setThumbnails] = useState<IThumbnailSize[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (thumbnails.length) {
      setLoading(false);
      setShowModal(true);
    }
  }, [thumbnails]);

  const handleCrop = useCallback(() => {
    if (fileInfo) {
      const imageElement: any = cropperRef?.current;
      const cropper = imageElement?.cropper;

      cropper.getCroppedCanvas().toBlob(
        (blob: Blob) => {
          uploadCroppedFile(blob, fileInfo.name, setLoading, setThumbnails);
          //TODO: put this in callback
          cropper.clear();
        },
        "image/jpeg",
        1
      );
    }
  }, [fileInfo]);

  return (
    <div className="resizer h-100 col-lg-10 col-xl">
      <div className="inner-grid">
        {fileInfo && (
          <div className="">
            <div className="crop-container">
              <CropBox
                className=""
                src={fileInfo.url}
                style={{ height: 500 }}
                aspectRatio={4 / 3}
                viewMode={1}
                guides={false}
                autoCrop={false}
                ref={cropperRef}
              />
              {loading !== false && (
                <ProgressBar
                  className="progress-indicator"
                  variant="success"
                  now={loading}
                  label={`${loading}%`}
                />
              )}
            </div>
            <div className="row">
              <div className="col">
                <Button
                  className="mr-2"
                  variant="outline-secondary"
                  onClick={() => setFileInfo(undefined)}
                >
                  Change Photo
                </Button>
                <Button onClick={handleCrop} disabled={!!loading}>
                  Crop image
                </Button>
              </div>
            </div>
            <FileModal show={showModal} onHide={() => setShowModal(false)}>
              {!!thumbnails.length &&
                thumbnails.map((item, i) => {
                  return (
                    <div className="thumbnail-item mb-4" key={"item-" + i}>
                      <h4 className="h6">
                        Size {item.size}: {item.width}x{item.height}{" "}
                      </h4>
                      <a
                        className="d-block text-small"
                        target="_blank"
                        href={item.url}
                      >
                        <img
                          className="img-thumbnail"
                          src={item.url}
                          alt={`Thumbnail image, size ${item.size}`}
                          width={item.width}
                          height={item.height}
                        />
                      </a>
                    </div>
                  );
                })}
            </FileModal>
          </div>
        )}
        {!fileInfo && (
          <div className="d-flex align-items-center">
            <DropZone callback={setFileInfo} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Resizer;
