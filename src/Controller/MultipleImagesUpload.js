import React, { useState, useEffect, useContext } from "react";
import { db, storage } from "../Model/setup/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion, arrayRemove
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
  const [file, setFile] = useState([]);
  const [compressedFiles, setCompressedFiles] = useState([])
  const [url, setUrl] = useState("")
  const [thumbs, setThumbs] = useState([])
  const filesFolder = {
    thumbnail: 'products-thumbnails',
    download: 'products-downloads'
  }
  const docFolder = {
    thumbnail: 'productThumbnails',
    download: 'productDownloads'
  }


  async function UploadImageToServer(type, productID, iumagesArray, document) {
      var tempArray = []
      for (var i = 0; i < iumagesArray.length; i++) {
        const storageRef = ref(storage, `/${type}/${productID}/${iumagesArray[i].name}`);
        uploadBytes(storageRef, iumagesArray[i]).then((snapshot) => {
        console.log("Uploaded a blob or file! ");
        // console.log(file[i].name)
        getDownloadURL(storageRef)
        .then((url) => {
            console.log(url)
            tempArray.push(url)
        })
    });

    }
    // setUrls(tempArray)
    await setDoc(doc(db, document, productID), {links: tempArray});
}
  function handleFileChange(e) {
    setFile(e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
        console.log(e.target.files[i])
    }
  }
  function handleUpload() {
      UploadImageToServer(filesFolder.download, productID, file, docFolder.download)
    }
    function handleCompressUpload() {
        for (var i = 0; i < compressedFiles.length; i++) {
            console.log(compressedFiles[i])
        }
        UploadImageToServer(filesFolder.thumbnail, productID, compressedFiles, docFolder.thumbnail)
    }
 async function handleCompress() {
      console.log("Let compress")
      let tempArray = [] 
      for (var i = 0; i < file.length; i++) {
        let thumb = null;
        if (file[i].size > 200000) {
            thumb = await ImageCompression(file[i])
        } else {
            thumb =  file[i]
        }
        // var fileNew = new File([thumb], file[i].name);
        tempArray.push(thumb)
    }

    setCompressedFiles(tempArray)
    console.log("compressed")
    }
  
  return (
    <div>

        <FormGroup>
          <Label>Upload Files</Label>
          <Input
            multiple
            type="file"
            name="file"
            onChange={handleFileChange}
          />
        <Button style={{fontSize: '15px', padding: '0.5rem 0.8rem'}} onClick={handleUpload}>Upload Original File</Button>
        <Button style={{fontSize: '15px', padding: '0.5rem 0.8rem'}} onClick={handleCompress}>Compress Images</Button>
        <Button style={{fontSize: '15px', padding: '0.5rem 0.8rem'}} onClick={handleCompressUpload}>Upload Compressed</Button>
        </FormGroup>
    </div>
  );
}

export default ImageUpload;

