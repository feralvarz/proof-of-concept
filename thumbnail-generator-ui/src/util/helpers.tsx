import { getThumbnailUrls, storage } from "./firebaseApp";
import _, { delay } from "lodash";

/**
 * Gets a file name without extension
 * @param name Name property from File object
 * @returns a file name only without extension
 */
export const getFileName = (name: string) => {
  const re = /([^\/]+)(?=\.\w+$)/gim;
  const result = re.exec(name);

  return result && result[0];
};

/**
 * Upload file to firebase storage
 * @param file
 * @param fileName
 * @param loadCallback
 */
export const uploadCroppedFile = (
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
