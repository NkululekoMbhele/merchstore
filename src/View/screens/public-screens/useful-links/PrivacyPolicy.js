import React from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Footer from '../../../components/footer/Footer'
import {SectionContainer, TitleLight} from './styles/Styles'
import {useDocumentTitle} from '../../../../Controller/useDocumentTitle'


function PrivacyPolicy() {
    useDocumentTitle("Privacy Policy")
    return (
        <>
            <Navbar />
      <SectionContainer>
            <h1>Privacy Policy</h1>
      </SectionContainer>
      <Footer />
        </>
    )
}

export default PrivacyPolicy
