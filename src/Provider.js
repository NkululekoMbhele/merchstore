// Provider.js
import { createContext, useReducer, useContext, useEffect, useState } from 'react';
import Reducer from './Reducer'
import {db} from './Model/setup/firebase'
import {AuthContext} from './AuthProvider';
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
export const Context = createContext();

  

export default function Provider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentUser = useContext(AuthContext)
  let initialState = {
    count: 0,
  };
  // console.log(currentUser)
  async function fetchUserData() {
    const docRef = doc(db, "cartsession", currentUser.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data().productList);  
      initialState = { 
        count: productList.length
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  if (!!currentUser) {
    setIsLoggedIn(true)
    // console.log("is logged")
    fetchUserData()
  
  } else {
    // console.log("is not logged")
    if(localStorage.getItem('wishsession') !== null){
      var cartItems = localStorage.getItem('cartsession');
      var productList = JSON.parse(cartItems);
      initialState = {
         count: productList.length
      }
    }
  }
  
  const [state, dispatch] = useReducer(Reducer, initialState);
  
  return (
  <Context.Provider value={[state, dispatch]}>
      {props.children}
  </Context.Provider>
  )
}
