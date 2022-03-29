import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { SectionContainer, TitleLight } from "./styles/Styles";
import {useDocumentTitle} from '../../../../Controller/useDocumentTitle'


function About() {
  useDocumentTitle("About Us");
  return (
    <>
      <Navbar />
      <SectionContainer>
        <h1>About</h1>
      </SectionContainer>
      <Footer />
    </>
  );
}

export default About;
