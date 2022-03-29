import imageCompression from 'browser-image-compression';
import Resizer from "react-image-file-resizer";


async function ImageCompression(file) {
    const imageFile = file;
    let compressedFile = null;
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
        maxSizeMB: 25,
        maxWidthOrHeight: 5000,
        useWebWorker: true
    }
    try {
        compressedFile = await imageCompression(imageFile, options);
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
    } catch (error) {
        console.log(error);
    }
    return compressedFile;
}


const ImageResize = (file) => {
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            300,
            300,
            "PNG",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });
}

export { ImageCompression, ImageResize }