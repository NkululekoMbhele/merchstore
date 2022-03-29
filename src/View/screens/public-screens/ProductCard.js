import React, { useEffect, useState } from 'react'
import { db } from '../../../Model/setup/firebase'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart, faStar as farStar, faShoppingCart as farCart } from "@fortawesome/free-regular-svg-icons";
import { collection, getDocs } from "firebase/firestore";
import {Link} from 'react-router-dom'
import { Container, Title } from '../../styles/styled-components/General'

import { ProductDiscount, ProductPreviousPrice, ProductCurrentPrice, ProductTitle, LikeButton, SaleTag, CardContainer, CardHeader, CardImage, CardBody, CardFooter, CardButton } from "../../styles/styled-components/ProductCard";
// import './styles/Product.style.css'
import './styles/ProductCard.style.css'

function ProductCard(props) {
  const [like, setLike] = useState(false);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(null);
  const [addedToWish, setAddedToWish] = useState(false);

  const heart = {
    color: '#ed5862',
    cursor: 'pointer',
  }
  function addToWishList(productId) {
    var productsList = [];
    var pushData = {
        id: productId,
    }
    if(localStorage.getItem('wishsession') !== null){
     productsList = JSON.parse(localStorage.getItem("wishsession"));
     for (let i = 0; i < productsList.length; i++ ) {
        if (productsList[i].id === productId) {
            productsList.splice(i, 1);
            localStorage.setItem("wishsession",JSON.stringify(productsList));
            setAddedToWish(!addedToWish)
            return
        }
     }
    }
    productsList.push(pushData);
    localStorage.setItem("wishsession",JSON.stringify(productsList));

    setAddedToWish(!addedToWish)
}
  return (
    <div className="card-wrapper">
       <Link to={`/products/${props.slug}/${props.productId}`} className="product-card-container">
          <div className="product-card-header">
            <img className="product-card-thumb" alt="sample" src={props.thumbs[color].url} />
          </div>
          <div className="product-card-body">
            <div className="product-card-title">{props.name}</div>
            <div className="product-prices-container ">
              {false && <h4 className="product-card-previous-price">{`R30.22`}</h4>}
              <h4 className="product-card-current-price">{`R${props.price}`}</h4>
            </div>
            <div className="product-card-footer">
              <div className="span">{props.category}</div>
            </div>
          </div>
          <div className="product-card-sale-tag">Sale</div>
          <div className="product-card-discount">{`15% Off`}</div>
        </Link>
          <div className="product-card-like-button" onClick={() => addToWishList(props.productId)}>
            <FontAwesomeIcon style={heart} icon={addedToWish ? faHeart : farHeart} />
          </div>
    </div>
  )
}

export default ProductCard
