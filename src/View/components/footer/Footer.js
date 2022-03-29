import { Context } from '../../../Provider'
import React from 'react'
import './Footer.style.css'
import {Link, Router} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faYoutube, faFacebook, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons'


function Footer() {
    return (
        <footer className="footer">

            <div className="follow-us">
                <h4>Follow Us</h4>
                <div className="social-links">
                    <a href="https://facebook.com" ><FontAwesomeIcon className="icon facebook" icon={faFacebook} /></a>
                    <a href="https://instagram.com" ><FontAwesomeIcon className="icon instagram" icon={faInstagram} /></a>
                    <a href="https://youtube.com" ><FontAwesomeIcon className="icon youtube" icon={faYoutube} /></a>
                    <a href="https://twitter.com" ><FontAwesomeIcon className="icon twitter" icon={faTwitter} /></a>
                </div>
            </div>
            <div className="association-companies">
                <img 
                src="https://firebasestorage.googleapis.com/v0/b/nkululekodotio-2b22e.appspot.com/o/payment_design.svg?alt=media&token=52be8624-2496-4649-8e0c-533e408a99dc"
                alt="payment-options" />
            </div>
          
            <p id="copyright">&copy;{`${new Date().getFullYear()} Copyright - All rights reserved | `} <a href="https://store.nkululeko.io">Nkululeko Dot IO Store</a> </p>
        </footer>
    )
}

export default Footer
