import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { SectionContainer, TitleLight } from "./styles/Styles";
import {useDocumentTitle} from '../../../../Controller/useDocumentTitle'

function Help() {
  useDocumentTitle("Help Center")
  return (
    <>
      <Navbar />
        <SectionContainer>
          <h1>Help</h1>

        </SectionContainer>
      <Footer />
    </>
  );
}

export default Help;
