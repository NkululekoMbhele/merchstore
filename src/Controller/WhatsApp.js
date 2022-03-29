import React from 'react'
import WhatsAppIcon from '../assets/WhatApp.svg'

const WhatsApp = () => {
    const WhatsAppSytle = {
        position: 'fixed',
        width: 'auto',
        height: '50px',
        bottom: '20px',
        right: '20px',
    }
    return (
        <a href="https://wa.me/27672679348" target="_blank" rel="noreferrer">
            <img src={WhatsAppIcon} alt="whatsapp" style={WhatsAppSytle}/>
        </a>
    )
}

export default WhatsApp