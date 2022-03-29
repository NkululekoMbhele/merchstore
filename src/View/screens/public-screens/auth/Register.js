import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FormGroup,
  Label,
  Input,
  Message,
  Textarea,
  FormButton,
} from "../../../styles/styled-components/Forms";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
import {useDocumentTitle} from '../../../../Controller/useDocumentTitle'

function Register() {
  useDocumentTitle("Register")
  let location = useLocation();
  let navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [toSend, setToSend] = useState({
    fullName: "",
    email: "",
    emailConfirm: "",
    password: "",
    passwordConfirm: "",
    newsletterChecked: "",
    mobileNumber: "",
    street: "",
    city: "",
    postalCode: "",
    suburb: "",
  });

  async function submitForm(e) {
    e.preventDefault();
    let userUID = "";
    createUserWithEmailAndPassword(auth, toSend.email, toSend.password)
      .then((userCredential) => {
        // Signed in
        console.log("signed in");
        const user = userCredential.user;
        console.log(user);
        setUserId(user.uid);
        addDoc(collection(db, "account"), {
          address: {
            city: toSend.city,
            postalCode: toSend.postalCode,
            street: toSend.street,
            suburb: toSend.suburb,
          },
          personalInfo: {
            fullName: toSend.fullName,
            email: toSend.email,
            mobileNumber: toSend.mobileNumber,
            password: toSend.password,
          },
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
        if (toSend.newsletterChecked) {
          addDoc(collection(db, "newsLetterList"), {
            email: toSend.email,
            name: toSend.fullName,
            userId: userId,
          })
        }

        console.log("User Details Saved");

        setToSend({
          fullName: "",
          email: "",
          emailConfirm: "",
          password: "",
          passwordConfirm: "",
          newsletterChecked: false,
          mobileNumber: "",
          street: "",
          city: "",
          postalCode: "",
          suburb: "",
        });
        navigate(`${location.state.from.pathname}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };
  const handleChecked = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.checked });
  };
  return (
    <>
      <Navbar />
      <Container>
        <Title>Register</Title>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={submitForm}
        >
          <FormGroup>
            <Label>Full Name</Label>
            <Input
              placeholder="Full name"
              type="text"
              value={toSend.fullName}
              name="fullName"
              onChange={handleChange}
            />
            {false && <Message>This is the validation message</Message>}
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              placeholder="Email"
              type="email"
              value={toSend.email}
              name="email"
              onChange={handleChange}
            />
            {false && <Message>This is the validation message</Message>}
          </FormGroup>
          {/* <FormGroup>
            <Label>Re-enter Email</Label>
            <Input
              placeholder="Email confirm"
              type="email"
              value={toSend.emailConfirm}
              name="emailConfirm"
              onChange={handleChange}
            />
            {false && <Message>This is the validation message</Message>}
          </FormGroup> */}
          <FormGroup>
            <Label>Password</Label>
            <Input
              placeholder="Password"
              value={toSend.password}
              name="password"
              type="password"
              onChange={handleChange}
            />
            {false && <Message>This is the validation message</Message>}
          </FormGroup>
          <FormGroup>
            <Label>Re-enter Password</Label>
            <Input
              placeholder="Password repeat"
              value={toSend.passwordConfirm}
              name="passwordConfirm"
              type="password"
              onChange={handleChange}
            />
            {false && <Message>This is the validation message</Message>}
          </FormGroup>
          <FormGroup>
            <Label>Mobile Number</Label>
            <Input
              placeholder="Mobile number"
              value={toSend.mobileNumber}
              name="mobileNumber"
              type="number"
              onChange={handleChange}
            />
            {false && <Message>This is the validation message</Message>}
          </FormGroup>
          <FormGroup>
            <Label style={{ fontWeight: "bold", margin: "0.8rem 0" }}>
              Address (optional)
            </Label>
            <Label>Street Name/Number</Label>
            <Input
              placeholder="Street name/Number"
              value={toSend.street}
              name="street"
              type="text"
              onChange={handleChange}
            />
            {false && <Message>This is the validation message</Message>}
            <Label>Suburb</Label>
            <Input
              placeholder="Suburb"
              value={toSend.suburb}
              name="suburb"
              type="text"
              onChange={handleChange}
            />
            {false && <Message>This is the validation message</Message>}
            <FormGroup style={{display: 'flex'}}>
              <FormGroup style={{marginRight: '10px', width: '80%'}}>
                <Label>City</Label>
                <Input
                  placeholder="City"
                  value={toSend.city}
                  name="city"
                  type="text"
                  onChange={handleChange}
                />
                {false && <Message>This is the validation message</Message>}
              </FormGroup>
              <FormGroup style={{ width: '40%'}}>
                <Label>Postal Code</Label>
                <Input
                  placeholder="Postal Code"
                  value={toSend.PostalCode}
                  name="postalCode"
                  type="number"
                  onChange={handleChange}
                />
                {false && <Message>This is the validation message</Message>}
              </FormGroup>
            </FormGroup>
          </FormGroup>
          <FormGroup style={{ display: "flex", margin: "20px 0" }}>
            <input
              style={{ padding: "5px", marginRight: "20px" }}
              checked={toSend.newsletterChecked}
              value={toSend.newsletterChecked}
              name="newsletterChecked"
              type="checkbox"
              onChange={(e) =>
                setToSend({ ...toSend, [e.target.name]: e.target.checked })
              }
            />
            <Label style={{}}>
              Subscribe to our newsletter, to be the first to know about our
              great and new products.
            </Label>
          </FormGroup>
          <FormButton type="submit" value="REGISTER NOW" />
        </form>
        <FormGroup style={{ fontSize: "12px", textAlign: "center" }}>
          By clicking on 'REGISTER NOW', you agree to our{" "}
          <Link to="/terms-and-conditions">Terms and Conditions</Link> and
          confirm that you are over 16 years of age
        </FormGroup>
        <h4 style={{ marginTop: "30px" }}>Already have an account! </h4>{" "}
        <Link to="/login">Login</Link>
      </Container>
      <Footer />
    </>
  );
}

export default Register;
