import React, { useState, useEffect } from "react";
import {
  FormGroup,
  Label,
  Input,
  Message,
  Textarea,
  FormButton,
} from "../../../styles/styled-components/Forms";
import {
  Container,
  Title
} from "../../../styles/styled-components/General";
import Navbar from '../../../components/navbar/Navbar'
import Footer from '../../../components/footer/Footer'

import {db} from '../../../../Model/setup/firebase'
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import {useDocumentTitle} from '../../../../Controller/useDocumentTitle'

function Contact() {
  useDocumentTitle("Contact Us");
  const [toSend, setToSend] = useState({
    name: '',
    email: '',
    message: '',
    createdAt: serverTimestamp(),
    status: ''
  })
  
  async function submitForm(e) {
    e.preventDefault();
    await addDoc(collection(db, "messages"), toSend);
    setToSend({
      name: '',
      email: '',
      message: '',
      // createdAt: serverTimestamp(),
      // time: Timestamp.fromDate(new Date().toLocaleTimeString()),
      status: ''
    })
  }
  

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
};

  return (
      <>
      <Navbar />
    <Container >
      <Title>Contact Us</Title>
      <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={submitForm} >
      <FormGroup>
        <Label htmlFor="label">Full Name</Label>
        <Input id="label" value={toSend.name} name="name" placeholder="Name" onChange={handleChange} />
        {(false) && <Message>This is the validation message</Message>}
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input value={toSend.email} name="email" placeholder="Email" onChange={handleChange} />
        {(false) && <Message>This is the validation message</Message>}
      </FormGroup>
      <FormGroup>
        <Label>Message</Label>
        <Textarea rows="4" cols="50" name="message" placeholder="Message ..." value={toSend.message} onChange={handleChange} />
        {(false) && <Message>This is the validation message</Message>}
      </FormGroup>
     
          <FormButton  type="submit" value="SEND"/>
        </form>
     
    </Container>
    <Footer/>
    </>
  );
}
export default Contact;
