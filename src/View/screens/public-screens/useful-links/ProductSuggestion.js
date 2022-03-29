import React from 'react';
import Navbar from '../../../components/navbar/Navbar'
import Footer from '../../../components/footer/Footer'
import {SectionContainer, TitleLight} from './styles/Styles'
import {useDocumentTitle} from '../../../../Controller/useDocumentTitle'


function ProductSuggestion() {
  useDocumentTitle('Product Suggestion')
  return (
    <div>
      <Navbar />
      <SectionContainer>
        <h1>Product Suggestion</h1>
      </SectionContainer>
    <Footer/>
    </div>
  );
}

export default ProductSuggestion;
