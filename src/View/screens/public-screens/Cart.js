import React, { useState, useEffect, useRef, useContext } from 'react'
import { useDocumentTitle } from '../../../Controller/useDocumentTitle'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Loader from '../../../Controller/Loader'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../Model/setup/firebase'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Footer from '../../components/footer/Footer'
import { Context } from '../../../Provider'
import './styles/Cart.style.css'

const Cart = () => {
  useDocumentTitle('Cart');
  const [products, setProducts] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [productInfo, setProductInfo] = useState([])
  const [loading, setLoading] = useState(true)
  const [cartChange, setCartChange] = useState(true)
  const [itemCount, setItemCount] = useState(1)
  const componentMounted = useRef(true);
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate()

  async function fecthData(data) {
    let tempProducts = []
    for (let value of data) {
      const q = query(collection(db, "merch_products"), where("productId", "==", value.id));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        tempProducts.push(doc.data());
        setLoading(false)
      }
      );
    }
    let total = 0;

    for (let i = 0; i < tempProducts.length; i++) {
      total = total + (tempProducts[i].price * data[i].count);
    }
    setProducts(tempProducts)
    setTotalAmount(total)
  }


  useEffect(() => {
    var cartItems = localStorage.getItem('cartsession');
    var productList = JSON.parse(cartItems);
    fecthData(productList)
    if (componentMounted.current) {
      setLoading(false)
      setProductInfo(productList);
    }
    return () => {
      componentMounted.current = false; //This worked for me
    };
  }, [cartChange]);

  function totalAmountCalculator() {
    var cartItems = localStorage.getItem('cartsession');
    var productList = JSON.parse(cartItems);
    var total = 0;
    for (let i = 0; i < products.length; i++) {
      total = total + (products[i].price * productList[i].count);
    }
    console.log(total)
    setTotalAmount(total);
    return total;
  }

  function removeItem(index) {
    decrement()
    console.log(index)
    var productsList = JSON.parse(localStorage.getItem("cartsession"));
    console.log(productsList);
    productsList.splice(index, 1);
    console.log("After")
    console.log(productsList);
    setCartChange(!cartChange)
    localStorage.setItem("cartsession", JSON.stringify(productsList));
  }

  // console.log(products[0])
  // function allStorage() {
  //   var produs = localStorage.getItem('cartsession');
  //   var productList = JSON.parse(products);
  //   setProducts(productList);
  //   console.log(productList[0])
  //   // navigate("/checkout")
  // }
  function decrement() {
    dispatch({
      type: "DECREMENT",
      payload: 1,
    });
  }
  function decrementCount(id) {
    
    var cartItems = JSON.parse(localStorage.getItem('cartsession'));
    console.log("Decrement")
    for (let value of cartItems) {
      if (value.id === id) {
        if (value.count > 1) {
          value.count = value.count - 1;
        }
      }
    }
    console.log(cartItems);
    setProductInfo(cartItems);
    localStorage.setItem("cartsession",JSON.stringify(cartItems));
    setCartChange(!cartChange)
  }
  function incrementCount(id) {
    console.log("increment")
    var cartItems = JSON.parse(localStorage.getItem('cartsession'));
    for (let value of cartItems) {
      if (value.id === id) {
        value.count = value.count + 1;
      }
    }
    console.log(cartItems);
    setProductInfo(cartItems);
    localStorage.setItem("cartsession",JSON.stringify(cartItems));
    setCartChange(!cartChange)
  }

  return (
    <>
      <Navbar />
      {
        loading ? (
          <Loader />
        ) : (

          <div className="cart-page-container">
            <div className="cart-title">
              <h1>Cart</h1>
              {/* {products.length} */}
              {/* {products[0].name} */}
            </div>
            <div className="cart-list">
              {
                products.map((product, key) => {
                  return (
                    <div key={key} className="cart-list-item">
                      <div className="item-thumbnail" >
                        <img className="thumb" src={product.thumbs[productInfo[key].color].url} alt={product.name} />
                      </div>
                      <div className="item-info">
                        <h3>{product.name}</h3>
                        <div className="order-data">
                          <div className="left">
                            <p>Color: <span>{product.thumbs[productInfo[key].color].color}</span></p>
                            <p>Size: <span>{product.sizes[productInfo[key].size].size}</span></p>
                          </div>
                        </div>
                      </div>
                      <div className="item-price">
                        <p>Price</p>
                        <h3>{`R${product.price}`}</h3>
                        <div className="count-right">
                            <p>Count:
                              <span className="decrement" onClick={() => decrementCount(product.productId)}>-</span>
                              <span className="count">{productInfo[key].count}</span>
                              <span className="increment" onClick={() => incrementCount(product.productId)}>+</span>
                            </p>
                          </div>
                      </div>
                      <FontAwesomeIcon onClick={() => removeItem(key)} className="delete-icon" icon={faTrash} />
                    </div>
                  )
                })
              }
            </div>
            <div className="checkout">
              <div className="total-amount">
                <h5>Total Amount</h5>
                <h3>R{totalAmount}</h3>
              </div>
              <Link to="/checkout/confirmation" state={{products, productInfo, totalAmount}} className="checkout-btn">Checkout</Link>
            </div>
            {/* <button onClick={postData} >POST</button> */}
          </div>
        )}
      <Footer />
    </>
  )
}

export default Cart