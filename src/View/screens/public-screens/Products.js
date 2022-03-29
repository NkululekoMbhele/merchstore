import React, { useEffect, useState } from "react";
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import { db } from '../../../Model/setup/firebase'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart, faStar as farStar, faShoppingCart as farCart } from "@fortawesome/free-regular-svg-icons";
import { collection, getDocs } from "firebase/firestore";
import { Container, Title } from '../../styles/styled-components/General'

import { ProductDiscount, ProductPreviousPrice, ProductCurrentPrice, ProductTitle, LikeButton, SaleTag, CardContainer, CardHeader, CardImage, CardBody, CardFooter, CardButton } from "../../styles/styled-components/ProductCard";
// import { WHM } from 'cpanel-rest-api';

import ProductItem from "./ProductItem";
import ProductCard from "./ProductCard";


const Products = () => {
  const [data, setData] = useState(null)
  console.log("Data")
  // useEffect(() => {


  // }, [])
  const heart = {
    color: '#ed5862',
    cursor: 'pointer',
  }
  return (
    <div>
      <Navbar />
      <Container>
        <Title> Products </Title>
        <ProductCard />
        <form action="https://sandbox.payfast.co.za​/eng/process" method="post">
          <input type="hidden" name="merchant_id" value="10000100" />
          <input type="hidden" name="merchant_key" value="46f0cd694581a" />
          <input type="hidden" name="amount" value="100.00" />
          <input type="hidden" name="item_name" value="Test Product" />
          <input type="hidden" name="return_url" value="http://localhost:3000/payments/success" />
          <input type="hidden" name="cancel_url" value="http://localhost:3000/payments/cancel" />
          <input type="hidden" name="notify_url" value="http://localhost:3000/payments/notify" />
          <input type="submit" />
        </form> 
      </Container>
    </div>
  );
};

export default Products;
