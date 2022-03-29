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
import {db} from "../../../Model/setup/firebase"
import { categories } from "../../../Model/data/Categories";
import { collection, query, where, getDocs } from "firebase/firestore";
import {AuthContext} from '../../../AuthProvider';


const Navbar = ({ cartCount }) => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const [username, setUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isUserTabShown, setIsUserTabShown] = useState(false);
  const [isCartTabShown, setIsCartTabShown] = useState(false);

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

  useEffect(() => {
    // console.log(currentUser)
    if (!!currentUser) {
      setIsLoggedIn(true)
      // console.log("is logged")
    }
    fetchUserData()
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
              <div style={{ fontSize: '12px', marginRight: "20px", }} className="username">
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
              <div className="cart-items-container">
                  <div className="cart-item">
                    <img src="https://firebasestorage.googleapis.com/v0/b/nkululeko-store.appspot.com/o/products-downloads%2FPB52378%2Fbg-01.png?alt=media&token=24989883-4b7c-43c9-9ad9-7a09ccce986d" alt="sample" className="product-image" />
                    <h5 className="product-name">Haybo this is a name</h5>
                    <div className="delete-price">
                        <FontAwesomeIcon className="delete-icon" icon={faTrash} />
                        <h4 className="product-price">{`R109.25`}</h4>
                    </div>
                  </div>
              </div>
              <div className="total">
                <h3>{`Total: R200.55`}</h3>
              </div>
              <div className="btn-cart">
                <Link className="btn" to="/checkout">
                  <FontAwesomeIcon className="btn-icon" icon={faLock}/>
                  Checkout</Link>
                <Link  className="btn" to="/cart">
                  <FontAwesomeIcon className="btn-icon" icon={faShoppingCart}/>
                  Cart</Link>
              </div>
   
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