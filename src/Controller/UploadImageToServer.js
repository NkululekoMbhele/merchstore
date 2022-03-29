import {useState} from 'react';
import {storage} from '../Model/setup/firebase'
import {  ref, uploadBytes, getDownloadURL } from "firebase/storage";


function useUploadImageToServer(type, productId, file) {
    const [url, setUrl] = useState()
    const storageRef = ref(storage, `/${type}/${productId}/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      getDownloadURL(storageRef)
      .then((url) => {
        console.log(url)
        setUrl(url)
      })
    });
    return url;
}

export {useUploadImageToServer}
