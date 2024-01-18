import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebase";

const useFileUpload = (position: string) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<string | undefined>(undefined);

  const handleUpload = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    const storageRef = ref(storage, `/${position}/${file.name + Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImage(url);
          setPreviewUrl(URL.createObjectURL(file));
        });
      }
    );
    event.target.value = null;
  };

  return { previewUrl, image, handleUpload, setPreviewUrl };
};

export default useFileUpload;
