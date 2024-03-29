import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebase";
import { ICategory, IProduct } from "@/interfaces";

// const useFileUpload = (
//   position: string,
//   record: IProduct | ICategory | undefined
// ) => {
//   const [previewUrl, setPreviewUrl] = useState<string | undefined>(record?.src);
//   const [image, setImage] = useState<string | undefined>(record?.src);

//   const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result as string);
//       };
//       reader.readAsDataURL(file);

//       const storageRef = ref(storage, `/${position}/${file.name + Date.now()}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {},
//         (err) => console.log(err),
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//             setImage(url);
//             setPreviewUrl(URL.createObjectURL(file));
//           });
//         }
//       );
//     }
//   };

//   return { previewUrl, image, handleUpload, setPreviewUrl };
// };

// export default useFileUpload;

const useFileUpload = (
  position: string,
  record: IProduct | ICategory | undefined
) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(record?.src);
  const [image, setImage] = useState<string | undefined>(record?.src);

  const handleUpload = (event: any) => {
    const file = event.fileList[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file.originFileObj);
    }

    const storageRef = ref(
      storage,
      `/${position}/${file.originFileObj.name + Date.now()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file.originFileObj);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImage(url);
          setPreviewUrl(URL.createObjectURL(file.originFileObj));
        });
      }
    );
  };

  useEffect(() => setImage(record?.src), [record]);
  return { previewUrl, image, handleUpload, setPreviewUrl };
};

export default useFileUpload;
