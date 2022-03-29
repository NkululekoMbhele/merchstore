import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import {db, storage} from '../../../Model/setup/firebase'
import { collection, query, where, getDocs } from "firebase/firestore";
import {Link} from 'react-router-dom'

function SubCategories() {
    const { category, subcategory} = useParams()
    const [products, setProducts] = useState([])
    useEffect(() => {
        async function fetchData() {
            const q = query(collection(db, "products"), where("category", "==", "photos"));
            
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        }
        fetchData()
    }, [subcategory])
    const sectionPadding =  {
        padding: '1.5rem 5vw',
    }
    return (
        <>
            <Navbar/>
            <section style={sectionPadding}>
                <div className="path">
                    <Link to={`/${category}`}>{category}</Link>
                    <p>{` > `}</p>
                    <Link disable to={`/${subcategory}`}>{subcategory}</Link>
                </div>
                {`${category} > ${subcategory}`}
            </section>
            <Footer/>
        </>
    )
}

export default SubCategories
