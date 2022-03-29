import React, { useState, useEffect, useContext } from "react";
import {
  FormGroup,
  Label,
  Input,
  Message,
  Textarea,
  FormButton,
} from "../../../styles/styled-components/Forms";
import { collection, addDoc, Timestamp, serverTimestamp, setDoc, doc } from "firebase/firestore"; 
import { useNavigate } from 'react-router';
import {
  Container,
  Title
} from "../../../styles/styled-components/General";
import Navbar from '../../../components/navbar/Navbar'
import Footer from '../../../components/footer/Footer'
import { Link, Outlet, Navigate, useLocation } from 'react-router-dom'
import {db} from '../../../../Model/setup/firebase'
import {auth} from '../../../../Model/setup/firebase'
import {useAuth} from '../../../../ProtectedRoutes'
import {AuthContext} from '../../../../AuthProvider'
import { signInWithEmailAndPassword } from "firebase/auth";
import {useDocumentTitle} from '../../../../Controller/useDocumentTitle'



function Login(props) {
  useDocumentTitle("Login")
  let location = useLocation();
  console.log(location)
  const currentUser = useContext(AuthContext)
  let navigate = useNavigate();
  const [toSend, setToSend] = useState({
    email: '',
    password: ''
  })
  useEffect(() => {
    if (!!currentUser) {
        navigate(`${location.state.from.pathname}`)
    }
  }, [currentUser])

  async function addCartSession(id) {
    var productsList = JSON.parse(localStorage.getItem("cartsession"));
    console.log(productsList);
    await setDoc(doc(db, "cartsession", id), {
            productList: productsList,
          });
          console.log("Added To Online Cart");
      }
  async function submitForm(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, toSend.email, toSend.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("signed-in")
      console.log(user.uid)
      addCartSession(user.uid)
      navigate(`${location.state.from.pathname}`)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
  
    // console.log(isAuth)
    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };
    return (
        <>
      <Navbar />
        <Container >
      <Title>Login</Title>
      <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={submitForm} >

      <FormGroup>
        <Label>Email</Label>
        <Input placeholder="Email" value={toSend.email} name="email" onChange={handleChange} />
        {(false) && <Message>This is the validation message</Message>}
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input type="password" placeholder="Password" value={toSend.password} name="password" onChange={handleChange} />
        {(false) && <Message>This is the validation message</Message>}
      </FormGroup>
          <FormButton  type="submit" value="LOGIN"/>
        </form>
      <Link to='/register'>Create a new account</Link>
      <Link to='/reset-password'>Forgot password</Link>
    </Container>
    <Footer/>
    </>
    )
}

export default Login









