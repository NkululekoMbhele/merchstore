import React,  {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import {AuthContext} from '../../../AuthProvider'

// pages 
import Contact from './accountPages/Contact'
import Invoices from './accountPages/Invoices'
import Newsletter from './accountPages/Newsletter'
import PersonalDetails from './accountPages/PersonalDetails'
import Purchases from './accountPages/Purchases'
import Reviews from './accountPages/Reviews'
import Vouchers from './accountPages/Vouchers'
import Wishlist from './accountPages/Wishlist'
import Orders from './accountPages/Orders'

const AccountLinks = () => {
    const {page} = useParams()
    const currentUser = useContext(AuthContext)
    switch(page) {
        case "purchases":
            return (
                <>  
                    <Navbar />
                        <Contact />
                    <Footer />
                </>
              );
        case "invoices":
            return (
                <>  
                    <Navbar />
                        <Invoices />
                    <Footer />
                </>
              )
        case "orders":
            return (
                <>  
                    <Navbar />
                        <Orders />
                    <Footer />
                </>
              )
        case "reviews":
            return (
                <>  
                    <Navbar />
                        <Reviews />
                    <Footer />
                </>
              )
        case "wishlist":
            return (
                <>  
                    <Navbar />
                        <Wishlist />
                    <Footer />
                </>
              )
        case "vouchers":
            return (
                <>  
                    <Navbar />
                        <Vouchers />
                    <Footer />
                </>
              )
        case "personal-details":
            return (
                <>  
                    <Navbar />
                        <PersonalDetails />
                    <Footer />
                </>
              )
        case "newsletter":
            return (
                <>  
                    <Navbar />
                        <Newsletter />
                    <Footer />
                </>
              )
        case "contact":
            return (
                <>  
                    <Navbar />
                        <Contact />
                    <Footer />
                </>
              )
        default:
            return (
                <>  
                    <Navbar />
                    <div>404</div>
                    <Footer />
                </>
              )
      }
}

export default AccountLinks