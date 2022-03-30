import React, { useState, useContext, useEffect, useRef } from "react";
import {
  NavContainer,
  FlexContainer,
  Logo,
  ContainerLarge,
  SideBar,
} from "../../styles/styled-components/Navbar.style";
import { CSSTransition } from "react-transition-group";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faShoppingCart,
  faUser,
  faChevronRight,
  faLock,
  faTrash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import "./Navbar.style.css";
import {
  BarDivider,
  LineDivider,
} from "../../styles/styled-components/General";

import { cartCount } from "../../../Store";
import { Context } from "../../../Provider";
import { db } from "../../../Model/setup/firebase"
import { categories } from "../../../Model/data/Categories";
import { collection, query, where, getDocs } from "firebase/firestore";
import { AuthContext } from '../../../AuthProvider';
import Loader from "../../../Controller/Loader"

const Navbar = ({ cartCount }) => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const [username, setUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isUserTabShown, setIsUserTabShown] = useState(false);
  const [isCartTabShown, setIsCartTabShown] = useState(false);
  const [products, setProducts] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [productInfo, setProductInfo] = useState([])
  const [cartChange, setCartChange] = useState(false)
  
  const componentMounted = useRef(true);
  const [loading, setLoading] = useState(true)
  const [state, dispatch] = useContext(Context);
  const currentUser = useContext(AuthContext);

  async function fetchUserData() {
    if (!!currentUser) {
      const q = query(collection(db, "account"), where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUsername(doc.data().personalInfo.fullName)
        // console.log(doc.id, " => ", doc.data().personalInfo.fullName);
      });
    }
  }
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

    // console.log(currentUser)
    if (!!currentUser) {
      setIsLoggedIn(true)
      // console.log("is logged")
    }
    fetchUserData()    
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
  }, [currentUser])



  return (
    <NavContainer>
      <ContainerLarge>
        <FlexContainer className="left-parts">
          <NavLink className="logo-nav" to="/">
            <Logo
              src="https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/resources%2Fmerch.svg?alt=media&token=ada70535-2673-465a-8cc0-e7848e266d26"
              alt="logo"
            />
          </NavLink>
        </FlexContainer>
        <FlexContainer className="right-parts-links">
          {
            isLoggedIn ? (
              <div className="username">
                {` Hey there, ${username}`}
              </div>
            ) :
              (
                <>
                  <NavLink className="nav-login" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="nav-register" to="/register">
                    Register
                  </NavLink>
                </>
              )
          }
          <div className="user-container">
            <FontAwesomeIcon
              onMouseEnter={() => setIsUserTabShown(true)}
              onMouseLeave={() => setIsUserTabShown(false)}
              className="user"
              icon={faUser}
            />

            <div
              onMouseEnter={() => setIsUserTabShown(true)}
              onMouseLeave={() => setIsUserTabShown(false)}
              className={
                isUserTabShown ? "user-tab" : "user-tab user-tab-closed"
              }
            >
              <NavLink className="user-links" to="/account">
                My Account
              </NavLink>
              <NavLink className="user-links" to="/account/orders">
                Orders
              </NavLink>
              <a className="user-links" href="https://wa.me/27672679348" target="_blank" rel="noreferrer">
                Ask Us
              </a>
            </div>
          </div>
          <div className="cart-container">
            <FontAwesomeIcon
              onMouseEnter={() => setIsCartTabShown(true)}
              onMouseLeave={() => setIsCartTabShown(false)}
              className="cart"
              icon={faShoppingCart}
            />
            {state.count > 0 && <div className="cart-count">{state.count}</div>}

            <div
              onMouseEnter={() => setIsCartTabShown(true)}
              onMouseLeave={() => setIsCartTabShown(false)}
              className={
                isCartTabShown ? "cart-tab" : "cart-tab cart-tab-closed"
              }
            >
              {
                loading ? (
                  <Loader />
                ) : (

                  <>


                    <div className="cart-items-container">
                    {
                      products.map((product, key) => {
                        return  <div key={key} className="cart-item">
                        <img src={product.thumbs[productInfo[key].color].url} alt="sample" className="product-image" />
                        <h5 className="product-name">{product.name}</h5>
                        <div className="delete-price">
                          {/* <FontAwesomeIcon className="delete-icon" icon={faTrash} /> */}
                          <h4 className="product-price">{`R${product.price}`}</h4>
                        </div>
                      </div>
                      })
                    }
                     
                    </div>
                    <div className="total">
                      <h3>{`Total: R${totalAmount}`}</h3>
                    </div>
                    <div className="btn-cart">
                      <Link className="btn" to="/checkout/confirmation">
                        <FontAwesomeIcon className="btn-icon" icon={faLock} />
                        Checkout</Link>
                      <Link className="btn" to="/cart">
                        <FontAwesomeIcon className="btn-icon" icon={faShoppingCart} />
                        Cart</Link>
                    </div>
                  </>
                )
              }
            </div>
          </div>
        </FlexContainer>

      </ContainerLarge>
    </NavContainer>
  );
};



export default Navbar;



// ============== Backup =================== 


{/* <CSSTransition
in={activeMenu === "categories"}
timeout={500}
classNames="menu-secondary"
unmountOnExit
>
<div className="category-menu">
  <DropdownItem goToMenu="main">
    <h2>Shop by Categor</h2>
  </DropdownItem>
  {categories.map((category, i) => {
    return (
      <DropdownItem
       
        goToMenu={category.name}
      >
        {category.name}
      </DropdownItem>
    );
  })}
</div>
</CSSTransition> */}