import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FormGroup,
  Label,
  Input,
  Message,
  Textarea,
  FormButton,
} from "../../../styles/styled-components/Forms";
import {
  collection,
  addDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { Container, Title } from "../../../styles/styled-components/General";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";

import { db, auth } from "../../../../Model/setup/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import {useDocumentTitle} from '../../../../Controller/useDocumentTitle'


function ForgetPassword() {
  useDocumentTitle("Reset Password");
  const [toSend, setToSend] = useState({
    email: "",
  });
  const notify = () => toast("Password Reset Email Sent!");

  async function submitForm(e) {
    e.preventDefault();

    sendPasswordResetEmail(auth, toSend.email)
      .then(() => {
        console.log("passwordemail sent");
        notify();
        setToSend({ email: "" });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Navbar />
      <Container>
        <Title>Reset Password</Title>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={submitForm}
        >
          <FormGroup>
            <Label>Email</Label>
            <Input
              placeholder="Email"
              value={toSend.email}
              name="email"
              onChange={handleChange}
            />
            {false && <Message>This is the validation message</Message>}
          </FormGroup>
          <FormButton type="submit" value="RESET" />
        </form>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Container>
      <Footer />
    </>
  );
}

export default ForgetPassword;
