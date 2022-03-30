import React, { useState, useEffect, useRef, useContext } from 'react';
import Navbar from '../../../components/navbar/Navbar'
import Footer from '../../../components/footer/Footer';
import { Link, useParams, useLocation, useNavigate } from "react-router-dom"
import '../styles/Checkout.style.css'
import Loader from '../../../../Controller/Loader';
import { collection, query, where, getDocs, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useDocumentTitle } from '../../../../Controller/useDocumentTitle';
import { db } from '../../../../Model/setup/firebase'
import { AuthContext } from '../../../../AuthProvider'

const OrderItem = () => {
    const {orderId} = useParams()
    const currentUser = useContext(AuthContext)
    const [orderDetails, setOrderDetails] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchData()
    }, [])
    async function fetchData() {
        const docRef = doc(db, "merch_orderDetails", orderId);

        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            orderDetails(docSnap.data());
            setLoading(false)
            console.log("Document data:", docSnap.data());
        } else {
            setLoading(false)
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
  return (
      <>
        <Navbar />
        <section className="order-item-container">

        </section>
         <div>{orderId}</div>
        <Footer />
      </>
    )
}

export default OrderItem