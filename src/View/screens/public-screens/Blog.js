import React from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import Image from '../../../assets/blog.svg';
import {useDocumentTitle} from "../../../Controller/useDocumentTitle"

const Blog = () => {
    useDocumentTitle("Blog");
    const container ={
        width: '100vw',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    }
    const imageStyle ={
        width: 'auto',
        height: '70%'
    }
    return (
        <div>
            <Navbar />
            <div style={container}>
                <img style={imageStyle} src={Image} alt="blog" />
            </div>
            <Footer />
        </div>
    )
}

export default Blog
