import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import {CategoryList} from '../../../Model/data/CategoryList'
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer'
import {db, storage} from '../../../Model/setup/firebase'
import { collection, query, where, getDocs } from "firebase/firestore";



function Categories() {
    const [available, setAvailaible] = useState(false);
    const [products, setProducts] = useState([]);
    const {category} = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const q = query(collection(db, "products"), where("category", "==", category));
            
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        }   
        fetchData()
        if (CategoryList.includes(category)) {
            setAvailaible(true)
        } else {
            return navigate("/404");
        }
    }, [category, navigate])
    const sectionPadding =  {
        padding: '1.5rem 5vw',
    }
  return (
      <>
        <Navbar />
        <section style={sectionPadding}>
            {category}

        </section>
        <Footer />
      </>
   
  );
}

export default Categories;
