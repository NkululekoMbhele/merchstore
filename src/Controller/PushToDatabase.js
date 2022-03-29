import React, { useState, useEffect, useContext } from 'react';
import { db, storage } from '../Model/setup/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

import { Select, Label, Input, Textarea, FormGroup, Message, FormButton, Button } from '../View/styles/styled-components/Forms'
import ImageUpload from './ImageUpload';
import MultipleImagesUpload from './MultipleImagesUpload';

const product1 = {
  "thumbs": [
    {
      "alt": "black-tshirt",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0001%2FPromo-T-Shirt-Black.jpg?alt=media&token=ad722af4-d275-4e6c-97c3-5be12efb78c2",
      "color": "black"
    },
    {
      "alt": "navy-tshirt",
      "color": "navy",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0001%2FPromo-T-Shirt-Turquoise.jpg?alt=media&token=d65c261f-6b64-4c42-99c5-705e48825214"
    },
    {
      "alt": "white-tshirt",
      "color": "white",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0001%2FPromo-T-Shirt-White.jpg?alt=media&token=ebe035d6-b945-4e60-b409-2f659eb4ff7a"
    },
    {
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0001%2FPromo-T-Shirt-Yellow.jpg?alt=media&token=00d446e8-e649-40e0-9cd7-ec3310f2d42b",
      "color": "yellow",
      "alt": "yellow-tshirt"
    }
  ],
  "name": "Main Logo Branded Basic Tshirt",
  "productId": "PMS0001",
  "description": "Basic T-Shirt with our main logo on the front.",
  "sizes": [
    {
      "size": "extra-small",
      "available": true
    },
    {
      "available": true,
      "size": "small"
    },
    {
      "size": "medium",
      "available": true
    },
    {
      "available": true,
      "size": "medium"
    }
  ],
  "price": 129.99
}
const product2 = {
  "thumbs": [
    {
      "alt": "black-tshirt",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0002%2FPromo-T-Shirt-Black.jpg?alt=media&token=09d1a3f4-e308-4d6b-8f45-545af740341d",
      "color": "black"
    },
    {
      "alt": "navy-tshirt",
      "color": "navy",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0002%2FPromo-T-Shirt-Turquoise.jpg?alt=media&token=0176e612-48bd-4ebb-bb48-43152712f16a"
    },
    {
      "alt": "white-tshirt",
      "color": "white",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0002%2FPromo-T-Shirt-White.jpg?alt=media&token=09a86229-7278-4592-bc0b-8004643d7d62",
    },
    {
      "color": "yellow",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0002%2FPromo-T-Shirt-Yellow.jpg?alt=media&token=51d679e1-622b-4bba-9f3b-f179e76aa3fe",
      "alt": "yellow-tshirt"
    }
  ],
  "name": "Short Version Logo Branded Basic Tshirt",
  "productId": "PMS0002",
  "description": "Basic T-Shirt with our short version logo on the front.",
  "sizes": [
    {
      "size": "extra-small",
      "available": true
    },
    {
      "available": true,
      "size": "small"
    },
    {
      "size": "medium",
      "available": true
    },
    {
      "available": true,
      "size": "medium"
    }
  ],
  "price": 129.99
}
const product3 = {
  "thumbs": [
    {
      "alt": "black-v-neck",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0003%2FUnisex-V-Neck-T-Shirt-Black.jpg?alt=media&token=2748b1ef-f027-4949-93f5-069b02384902",
      "color": "black"
    },
    {
      "alt": "navy-v-neck",
      "color": "navy",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0003%2FUnisex-V-Neck-T-Shirt-Navy.jpg?alt=media&token=d43a510c-66f2-4cec-9e72-87dc6b328463"
    },
    {
      "alt": "white-v-neck",
      "color": "white",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0003%2FUnisex-V-Neck-T-Shirt-White.jpg?alt=media&token=de89e5ae-d8b9-4cb6-9735-b8457cc4ab07",
    },
  ],
  "name": "High quality branded V-neck Tshirt",
  "productId": "PMS0003",
  "description": "High quality V-neck t-shirt with our small logo on the pocket side.",
  "sizes": [
    {
      "size": "extra-small",
      "available": true
    },
    {
      "available": true,
      "size": "small"
    },
    {
      "size": "medium",
      "available": true
    },
    {
      "available": true,
      "size": "medium"
    }
  ],
  "price": 179.99
}

const product4 = {
  "thumbs": [
    {
      "alt": "black-long-sleeve",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0004%2FPremium-Long-Sleeve-T-Shirt-Black.jpg?alt=media&token=032a1845-14a6-4b2f-a6e6-3a72a3c52fa0",
      "color": "black"
    },
    {
      "alt": "navy-long-sleeve",
      "color": "navy",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0004%2FPremium-Long-Sleeve-T-Shirt-Navy.jpg?alt=media&token=3314ec66-df0c-4808-a27d-941db9b9d057"
    },
    {
      "alt": "white-long-sleeve",
      "color": "white",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0004%2FPremium-Long-Sleeve-T-Shirt-White.jpg?alt=media&token=c3a9170d-d69c-42b2-b22c-15116d7e8d68",
    },
  ],
  "name": "Main Logo Branded Long Sleeve T-shirt",
  "productId": "PMS0004",
  "description": "Premium long sleeve t-shirt with our main logo on the front.",
  "sizes": [
    {
      "size": "extra-small",
      "available": true
    },
    {
      "available": true,
      "size": "small"
    },
    {
      "size": "medium",
      "available": true
    },
    {
      "available": true,
      "size": "medium"
    }
  ],
  "price": 219.99
}

const product5 = {
  "thumbs": [
    {
      "alt": "black-long-sleeve",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0005%2FPremium-Long-Sleeve-T-Shirt-Black.jpg?alt=media&token=7e342b4e-7fd8-4bea-8927-aa551d43e5e1",
      "color": "black"
    },
    {
      "alt": "navy-long-sleeve",
      "color": "navy",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0005%2FPremium-Long-Sleeve-T-Shirt-Navy.jpg?alt=media&token=d6b80198-dde8-4c9d-9393-5e97a347cceb"
    },
    {
      "alt": "white-long-sleeve",
      "color": "white",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0005%2FPremium-Long-Sleeve-T-Shirt-White.jpg?alt=media&token=c3490984-574f-4146-ad61-0c47800250be",
    },
  ],
  "name": "Short Version Logo Branded Long Sleeve T-shirt",
  "productId": "PMS0005",
  "description": "Premium long sleeve t-shirt with our short version logo on the front.",
  "sizes": [
    {
      "size": "extra-small",
      "available": true
    },
    {
      "available": true,
      "size": "small"
    },
    {
      "size": "medium",
      "available": true
    },
    {
      "available": true,
      "size": "medium"
    }
  ],
  "price": 219.99
}

const product6 = {
  "thumbs": [
    {
      "alt": "black-hoodie",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0006%2FBase-Hoodie-Black.jpg?alt=media&token=078034fc-262d-4f0f-98b9-a44b5ace3868",
      "color": "black"
    },
    {
      "alt": "navy-hoodie",
      "color": "navy",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0006%2FBase-Hoodie-Navy.jpg?alt=media&token=b6a8446f-e110-4c13-bbd5-92dbe8db8baa"
    },
    {
      "alt": "white-hoodie",
      "color": "white",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0006%2FBase-Hoodie-White.jpg?alt=media&token=d30e17b7-d198-4136-881f-74f0304bf2ee",
    },
  ],
  "name": "Main Logo Branded Basic Hoodie",
  "productId": "PMS0006",
  "description": "Basic Hoodie with our main logo on the front.",
  "sizes": [
    {
      "size": "extra-small",
      "available": true
    },
    {
      "available": true,
      "size": "small"
    },
    {
      "size": "medium",
      "available": true
    },
    {
      "available": true,
      "size": "medium"
    }
  ],
  "price": 439.99
}

const product7 = {
  "thumbs": [
    {
      "alt": "black-hoodie",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0007%2FBase-Hoodie-Black.jpg?alt=media&token=78fba363-a4b2-4e16-aa96-375f2b6aa586",
      "color": "black"
    },
    {
      "alt": "navy-hoodie",
      "color": "navy",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0007%2FBase-Hoodie-Navy.jpg?alt=media&token=913c87bd-c3f4-48f1-8329-4a8338369734"
    },
    {
      "alt": "white-hoodie",
      "color": "white",
      "url": "https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/merch-products%2FPMS0007%2FBase-Hoodie-White.jpg?alt=media&token=6e3afe9e-60f7-4b21-bc1a-0e289885b2f6",
    },

  ],
  "name": "Short Version Logo Branded Basic Hoodie",
  "productId": "PMS0007",
  "description": "Basic hoodie with our short version logo on the front.",
  "sizes": [
    {
      "size": "extra-small",
      "available": true
    },
    {
      "available": true,
      "size": "small"
    },
    {
      "size": "medium",
      "available": true
    },
    {
      "available": true,
      "size": "medium"
    }
  ],
  "price": 439.99
}


const Products = [
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7
]



function PushToDatabase() {
  const [product, setProduct] = useState({})
  const [products, setProducts] = useState([0])

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "merch_products", "PMS0001");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    // fetchData()

  }, []);

  async function addProducts() {
    await setDoc(doc(db, "merch_products", "PMS0002"), product2);
    await setDoc(doc(db, "merch_products", "PMS0003"), product3);
    await setDoc(doc(db, "merch_products", "PMS0004"), product4);
    await setDoc(doc(db, "merch_products", "PMS0005"), product5);
    await setDoc(doc(db, "merch_products", "PMS0006"), product6);
    await setDoc(doc(db, "merch_products", "PMS0007"), product7);
    console.log("done")
  }

  return (
    <>
      <h1>Push</h1>
      <button onClick={addProducts}>Add Products</button>
    </>

  );
}


export default PushToDatabase;


