import React, { useState, useEffect, useContext } from "react";
import { db, storage } from "../Model/setup/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  Select,
  Label,
  Input,
  Textarea,
  FormGroup,
  Message,
  FormButton,
    Button
} from "../View/styles/styled-components/Forms";
import {ImageCompression} from './ImageCompression'
// import {useUploadImageToServer} from './UploadImageToServer'

function ImageUpload({productID}) {
  const [file, setFile] = useState('');
  const [url, setUrl] = useState("")
  const filesFolder = {
    thumbnail: 'products-thumbnails',
    download: 'products-downloads'
  }
  const docFolder = {
    thumbnail: 'productThumbnails',
    download: 'productDownloads'
  }


  async function UploadImageToServer(type, productID, file, document) {
    const storageRef = ref(storage, `/${type}/${productID}/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      getDownloadURL(storageRef)
      .then((url) => {
        console.log(url)
        setUrl(url)
      })
    });
    
    await setDoc(doc(db, document, productID), {links: [{url: url, alt: ""}]});
}
  function handleFileChange(e) {
      console.log(e.target.value)
    setFile(e.target.files[0]);
  }
  function handleUpload() {
      UploadImageToServer(filesFolder.download, productID, file, docFolder.download)
    }
  async function handleCompress() {
      console.log("Let compress")
      let thumb = await ImageCompression(file)
      UploadImageToServer(filesFolder.thumbnail, productID, thumb, docFolder.thumbnail)
  }
  return (
    <div>

        <FormGroup>
          <Label>Upload File</Label>
          <Input
            type="file"
            name="file"
            onChange={handleFileChange}
          />
        <Button style={{fontSize: '15px', padding: '0.5rem 0.8rem'}} onClick={handleUpload}>Upload Original File</Button>
        <Button style={{fontSize: '15px', padding: '0.5rem 0.8rem'}} onClick={handleCompress}>Compress Image And Upload Thumb</Button>
        </FormGroup>
    </div>
  );
}

export default ImageUpload;

