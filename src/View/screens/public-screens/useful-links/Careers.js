import React from 'react';
import Navbar from '../../../components/navbar/Navbar'
import Footer from '../../../components/footer/Footer'
import {SectionContainer, TitleLight} from './styles/Styles'
import {useDocumentTitle} from '../../../../Controller/useDocumentTitle'


function Careers() {
  useDocumentTitle('Careers')
  return (
    <>
    <Navbar />
      <SectionContainer>
        <h1>Careers</h1>
        <TitleLight>No Careers At The Moment</TitleLight>
      </SectionContainer>
    <Footer/>
    </>
  );
}

export default Careers;
