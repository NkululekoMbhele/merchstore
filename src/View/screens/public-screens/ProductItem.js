import React, {useState, useEffect, useCallback, useContext} from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Context } from '../../../Provider'
import { useParams } from 'react-router-dom'
import {useDocumentTitle} from '../../../Controller/useDocumentTitle'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../Model/setup/firebase'
import ImageViewer from "react-simple-image-viewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart, faStar as farStar, faShoppingCart as farCart } from "@fortawesome/free-regular-svg-icons";
import Loader from '../../../Controller/Loader'

import './styles/ProductItem.style.css'


function ProductItem(props) {
    const [color, setColor] = useState(0);
    const [size, setSize] = useState(null);
    const [product, setProduct] = useState({});
    const [addedToCart, setAddedToCart] = useState(false);
    const [addedToWish, setAddedToWish] = useState(false);
    const [loading, setLoading] = useState(true);
    const { slug, id } = useParams();
    var docTitle = ""
    if (slug.length > 0) {
        docTitle = slug.replaceAll('-', " ")
        docTitle = docTitle.replace(/\b\w/g, l => l.toUpperCase())
    }
    useDocumentTitle(docTitle)
    const [currentImage, setCurrentImage] = useState(0);
    const [activeTab, setActiveTab] = useState(1);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [state, dispatch] = useContext(Context);
    const [merch, setMerch] = useState([])

    const [productData, setProductData] = useState();
    useEffect(() => {
        async function fetchData() {
    
            const q = query(collection(db, "merch_products"), where("productId", "==", id));
    
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                setProduct(doc.data())
                setLoading(false)
            });
        }
        fetchData();
        if(localStorage.getItem('wishsession') !== null){
            var productsListWish = JSON.parse(localStorage.getItem("wishsession"));
            for (let value of productsListWish ) {
               if (value.id === id) {
                   setAddedToWish(!addedToWish)
               }
            }
           }
        if (localStorage.getItem('cartsession') !== null) {
            var productsList = JSON.parse(localStorage.getItem("cartsession"));
            for (let value of productsList) {
                if (value.id === id) {
                    setSize(value.size);
                    setAddedToCart(true)
                }
            }
        }
    }, [id])
    const images = [];
    if (Object.keys(product).length !== 0) {
        for (let value of product.thumbs) {
            images.push(value.url);
        }
    }
    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    function ShowActiveTab() {
        if (activeTab === 1) {
            return ProductDescription(product)
        }
        else if (activeTab === 2) {
            return ProductInformation(product)
        }
    }
    function increment() {
        dispatch({
          type: "INCREMENT",
          payload: 1,
        });
      }
      function getBackgroundColor(item) {
        // console.log(item)
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

    function addToCart(productId) {
        var productsList = [];
        var pushData = {
            id: productId,
            size: size,
            color: color,
            count: 1
        }
        if(localStorage.getItem('cartsession') !== null){
         productsList = JSON.parse(localStorage.getItem("cartsession"));
        }
        productsList.push(pushData);
        localStorage.setItem("cartsession",JSON.stringify(productsList));
        increment()
        setAddedToCart(true)
    }

    return (
        <>
            <Navbar />
            {
                loading ? (
                    <Loader /> 
                ) : 
            <div className="product-item-container">
                <div className="product-item-directory-container">
                    <div className="category">{`Company Merch`}</div>
                </div>
                <div className="product-item-wrapper">
                    <div className="product-item-top-info-wrapper">
                        <div className="thumb-container">
                            <img
                                onClick={() => openImageViewer(0)}
                                src={images[color]}
                                alt={product.name}
                                className="thumb"
                            />
                            {isViewerOpen && (
                                <ImageViewer
                                    src={images}
                                    currentIndex={currentImage}
                                    onClose={closeImageViewer}
                                    disableScroll={false}
                                    backgroundStyle={{
                                        backgroundColor: "rgba(0,0,0,0.9)"
                                    }}
                                    closeOnClickOutside={true}
                                />
                            )}
                        </div>
                        <div className="product-info-section">
                            <h3 className="name">{product.name}</h3>
                            <div className="category">{`Category`}</div>
                            <div className="reviews-wrapper">

                            </div>
                            <hr className="divider" />
                            <div className="take-away-info-list">

                            </div>
                        </div>
                    </div>
                    <div className="product-item-price-wrapper">
                        <h1 className="price marginBottom">{`R${product.price}`}</h1>
                        <div className="options-container">
                        <h5>Choose color:</h5>
                        <div className="product-color">
                          {
                            product.thumbs.map((colorItem, i) => {
                              return (
                                <div onClick={() => setColor(i)} key={i} style={{ backgroundColor: `${getBackgroundColor(colorItem.color)}` }} className={`color-box ${i === color && "selected-color"}`}>

                                </div>
                              )
                            })
                          }
                        </div>
                        <h5>Choose size:</h5>
                        <div className="product-available-sizes">
                          {
                            product.sizes.map((sizeItem, k) => {
                              return (
                                <div onClick={() => setSize(k)} key={k} className={`size-box ${k === size && "selected"}`}>
                                  {getSizeSign(sizeItem.size)}
                                </div>
                              )
                            })
                          }
                        </div>
                        </div>
                        <div onClick={() => addToCart(id)} style={{ backgroundColor: addedToCart && "#0079bf", pointerEvents: addedToCart && "none"}} className={(size!=null) ? "add-to-cart-btn" : "add-to-cart-btn disabled"}>
                                <FontAwesomeIcon className="icon" icon={faShoppingCart} />
                                {`${addedToCart ? "Added To Cart" : "Add To Cart"}`}
                        </div>
                        <div onClick={() => addToWishList(id)} className={addedToWish ? "add-to-wish-list-btn added-to-wish" : "add-to-wish-list-btn"}>
                        <FontAwesomeIcon className="icon" icon={addedToWish ? faHeart : farHeart} />
                        {`${addedToWish ? "Added To Wishlist" : "Add To Wishlist"}`} 
                        </div>
                    </div>
                </div>

                <div className="product-item-wrapper-metadata">
                    <div className="metadata-header">
                        <div className="tab-buttons">
                            <button className={activeTab === 1 ? 'active' : ''} onClick={() => setActiveTab(1)}>Product Description</button>
                            <button className={activeTab === 2 ? 'active' : ''} onClick={() => setActiveTab(2)}>Product Information</button>

                        </div>
                    </div>
                    <div className="metadata-main">
                        {ShowActiveTab()}
                    </div>
                </div>
                <div className="product-item-wrapper-reviews">
                <div className="review-header">
                    <h1>Product Reviews</h1>
                </div>
                <div className="review-body">
                    <div className="no-reviews">No reviews Yet</div>
                </div>
                    
                </div>

                {/* <h1>Product Item {id} slug {slug}</h1> */}
            </div>
            }

        </>
    )
}

export default ProductItem



function ProductDescription(props) {
    return (
        <div className="product-description">
            <p>{props.description}</p>
        </div>
    )
}

function ProductInformation(props) {
    return (
        <div className="product-information">
            <h1>Product Information</h1>
        </div>
    )
}