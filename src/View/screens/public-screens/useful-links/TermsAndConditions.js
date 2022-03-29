import React from 'react';
import Navbar from '../../../components/navbar/Navbar'
import Footer from '../../../components/footer/Footer'
import {SectionContainer, TitleLight} from './styles/Styles'
import {useDocumentTitle} from '../../../../Controller/useDocumentTitle'


function TermsAndConditions() {
  useDocumentTitle("Terms And Conditions")
  return (
    <div>
      <Navbar />
      <SectionContainer>
      <h1>Terms and Conditions</h1>
      </SectionContainer>
    <Footer/>
    </div>
  );
}

export default TermsAndConditions;
