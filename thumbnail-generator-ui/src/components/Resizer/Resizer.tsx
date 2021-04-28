import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Navbar, ProgressBar } from "react-bootstrap";
import { uploadCroppedFile } from "../../util/helpers";
import { Cropper as CropBox } from "react-cropper";
import { ILoadedFile, IThumbnailSize } from "../../util/types";
import { DropZone } from "./Dropzone";
import "cropperjs/dist/cropper.css";
import "./Resizer.css";
import { FileModal } from "../FileModal/FileModal";
import Logo from "../../favicon.png";

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
    <>
      <Navbar bg="dark" variant="dark" fixed="top" className="px-2">
        <Navbar.Brand>
          <img
            alt=""
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Thumbnails Demo App
        </Navbar.Brand>
      </Navbar>
      <main className="app-thumbnail-container container-fluid container-xl">
        <div className="resizer h-100 col">
          <div className="inner-grid">
            {fileInfo && (
              <div>
                <h3 className="pt-4 mb-1">{fileInfo.name}</h3>
                <p className="small text-secondary mb-4">
                  Select the area to crop in the image, use your scroll wheel to
                  zoom and pan
                </p>
                <div className="crop-container">
                  <CropBox
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
                      variant="primary"
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
                            className="d-inline-block text-small"
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
      </main>
    </>
  );
};

export default Resizer;
