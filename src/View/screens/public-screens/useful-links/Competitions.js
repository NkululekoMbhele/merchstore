import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { SectionContainer, TitleLight } from "./styles/Styles";
import {useDocumentTitle} from '../../../../Controller/useDocumentTitle'



function Competitions() {
  useDocumentTitle("Competitions");
  return (
    <>
      <Navbar />
      <SectionContainer>
        <h1>Competitions</h1>
        <TitleLight>No Competitions At The Moment</TitleLight>
      </SectionContainer>
      <Footer />
    </>
  );
}

export default Competitions;
