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


const Orders = () => {
  return (
    <div>Orders</div>
  )
}

export default Orders