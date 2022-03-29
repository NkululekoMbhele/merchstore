import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from '../../../AuthProvider'
import {auth} from '../../../Model/setup/firebase'
import {signOut} from "firebase/auth"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router';
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import {Title, SectionContainer, LinksContainer, SubTitle, LinkItem, LinkStyle , LinkListContainer} from './styles/Account.style'
import {useDocumentTitle} from '../../../Controller/useDocumentTitle'

import './styles/Account.style.css'

function User() {
    useDocumentTitle("Account")
    const [userDetails, setUserDetails] = useState({})
    let navigate = useNavigate();
    useEffect(() => {
        async function fetchData(){
            //
        }
        fetchData();
    }, [])
    const currentUser = useContext(AuthContext)
    function HandleSignOut(){
        signOut(auth).then(() => {
           navigate("/login")
          }).catch((error) => {
            console.error(error)
          });
    }
    return (
        <>
        <Navbar />
            <SectionContainer>
                <Title>My Account</Title>
                <div className="cards-container-top">
                    <LinksContainer>
                        <SubTitle>Purchases</SubTitle>
                        <LinkListContainer>
                            <Link style={LinkStyle } to="/account/orders">Orders</Link>
                            <Link style={LinkStyle } to="/account/invoices">Invoices</Link>
                            <Link style={LinkStyle } to="/account/reviews">Product Reviews</Link>
                            <Link style={LinkStyle } to="/account/personal-details">Personal Details</Link>
                            <Link style={LinkStyle } to="/account/wishlist">Your Wishlist</Link>
                            <div style={LinkStyle } onClick={HandleSignOut} >Log out</div>
                        </LinkListContainer>
                    </LinksContainer>
                </div>
            </SectionContainer>
        <Footer/>
        </>
    )
}

export default User
