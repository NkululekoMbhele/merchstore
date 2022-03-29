import React, { useContext, useState, useEffect } from "react";
import Navbar from '../../components/navbar/Navbar'
import { Context } from '../../../Provider'
import Footer from "../../components/footer/Footer";
import './styles/Home.style.css'
import { useDocumentTitle } from '../../../Controller/useDocumentTitle'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { db, database } from '../../../Model/setup/firebase'
import { getDatabase, ref, set } from "firebase/database";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "./ProductCard";
import axios from 'axios'

// import './styles/Product.style.css'
import './styles/ProductCard.style.css'


import Loader from '../../../Controller/Loader'


function Home() {
  const [ip, setIP] = useState('');
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(null);
  const [products, setProducts] = useState([]);
  // const products = [
  //   <ProductCard />,
  //   <ProductCard />,
  //   <ProductCard />,
  //   <ProductCard />,
  //   <ProductCard />,
  // ]

  useDocumentTitle("Home Page")
  const [state, dispatch] = useContext(Context);
  const [merch, setMerch] = useState([])
  async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "merch_products"));
    var tempArray = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      tempArray.push(doc.data())
    });
    setProducts(tempArray)
  }
  useEffect(() => {
    fetchData();
  }, [])
  function increment() {
    dispatch({
      type: "INCREMENT",
      payload: 1,
    });
  }
  function decrement() {
    dispatch({
      type: "DECREMENT",
      payload: 1,
    });
  }
  function getBackgroundColor(item) {
    console.log(item)
    var color = ""
    switch (item) {
      case "white":
        color = "#f5f5f5"
        break;
      case "yellow":
        color = "#ffca42"
        break;
      case "black":
        color = "#0d0d0d"
        break;
      case "navy":
        color = "#040c29"
        break;
      default:
        break;
      // code block
    }
    return color;
  }
  function getSizeSign(item) {

    var sizeLetter = ""
    switch (item) {
      case "extra-small":
        sizeLetter = "XS"
        break;
      case "small":
        sizeLetter = "S"
        break;
      case "medium":
        sizeLetter = "M"
        break;
      case "large":
        sizeLetter = "L"
        break;
      default:
        break;
      // code block
    }
    return sizeLetter
  }
  function addToCart() {
    console.log("addToCart")
    increment()
    localStorage.setItem('Name', "Heji");
    localStorage.setItem('Password', 2536);
    var colors = ["red", "blue", "green"];
    localStorage.setItem("my_colors", JSON.stringify(colors)); //store colors
    var storedColors = JSON.parse(localStorage.getItem("my_colors"));
  }
  function generateSlug(name) { 
        var docTitle = name.trim().replaceAll(' ', '-')
        docTitle = docTitle.toLowerCase()
        return docTitle
  }
  return (
    <div>
      <Navbar />
      <section className="merch-container">
        <div className="title-section">
          <h1>Our Merchandise</h1>
        </div>
        {
          (products.length === 0) ?
            <Loader /> :
            <div className="merch-list">
              {
                products.map((product, key) => {
                  return (
                    <ProductCard category={`company merch`} slug={generateSlug(product.name)} price={product.price} name={product.name} thumbs={product.thumbs} key={key} productId={product.productId} />
                  )
                })
              }
            </div>
        }
      </section>
      <Footer />
    </div>
  );
}

export default Home;
