import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { SectionContainer, TitleLight } from "./styles/Styles";
import {useDocumentTitle} from '../../../../Controller/useDocumentTitle'



function Deals() {
  useDocumentTitle("Deals")
  return (
    <>
      <Navbar />
      <SectionContainer>
        <h1>Deals</h1>
        <TitleLight>No Deals At The Moment</TitleLight>
      </SectionContainer>
      <Footer />
    </>
  );
}

export default Deals;
