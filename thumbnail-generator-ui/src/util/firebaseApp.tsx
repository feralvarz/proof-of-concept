import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import { IThumbnailSize } from "./types";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const thumbnailsApp = firebase.initializeApp(config);

export type UserCreated = firebase.auth.UserCredential;
export type UserCredential = firebase.auth.UserCredential;
export type User = firebase.User | null;
export enum StorageTaskStateEnum {
  PAUSED = "PAUSED",
  RUNNING = "RUNNING",
}

export const auth = thumbnailsApp.auth();
export const storage = thumbnailsApp.storage();

/**
 * Get urls from resized images
 * @param fileName Name of file to generate download links
 * @returns
 */
export const getThumbnailUrls = (fileName: string): IThumbnailSize[] => {
  const thumbURL = (size: string) =>
    `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/img%2Fthumbnails%2F${fileName}_${size}.jpeg?alt=media`;
  const sizes = [
    { size: "large", url: thumbURL("400x300"), width: "400", height: "300" },
    { size: "medium", url: thumbURL("160x120"), width: "160", height: "120" },
    { size: "small", url: thumbURL("120x120"), width: "120", height: "120" },
  ];

  return sizes;
};

export default auth;
