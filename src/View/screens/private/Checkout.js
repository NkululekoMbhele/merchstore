import React, { useState, useEffect, useRef, useContext } from 'react';
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer';
import { Link, useParams, useLocation, useNavigate } from "react-router-dom"
import './styles/Checkout.style.css'
import Loader from '../../../Controller/Loader';
import { collection, query, where, getDocs, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Model/setup/firebase'
import { AuthContext } from '../../../AuthProvider'
import {
    FormGroup,
    Label,
    Input,
    Message,
} from "../../styles/styled-components/Forms";

const Checkout = () => {
    const { step } = useParams()
    switch (step) {
        case "confirmation":
            return (
                <>
                    <Navbar />
                    <Confirmation />
                    <Footer />
                </>
            )
        case "delivery":
            return (
                <>
                    <Navbar />
                    <Delivery />
                    <Footer />
                </>
            )

        case "payment":
            return (
                <>
                    <Navbar />
                    <Payment />
                    <Footer />
                </>
            )

        case "successful":
            return (
                <>
                    <Navbar />
                    <Successful />
                    <Footer />
                </>
            )

        default:
            break;
    }
    return (
        <>
            <Navbar />
            <div className="checkout-container">
                <h1>Checkout</h1>
            </div>
            <Footer />
        </>
    );
}

export default Checkout;

function Confirmation() {
    const [products, setProducts] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [productInfo, setProductInfo] = useState([])
    useEffect(() => {
        var cartItems = localStorage.getItem('cartsession');
        var productList = JSON.parse(cartItems);
        fecthData(productList)
        setProductInfo(productList)
    }, [])

    async function fecthData(data) {
        let tempProducts = []
        for (let value of data) {
            const q = query(collection(db, "merch_products"), where("productId", "==", value.id));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                tempProducts.push(doc.data());
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
    return (
        <>
            <div className="checkout-confirmation">
                <div className="progress-bar">
                    <p className="active">Confirmation</p>
                    <hr className="seperator" />
                    <p>Delivery</p>
                    <hr className="seperator" />
                    <p>Payment</p>
                    <hr className="seperator" />
                    <p>Successful</p>
                </div>
                <div className="new-project-card">
                    <div className="project-card-header">
                        <h5>Your Order Items</h5>
                    </div>
                    <div className="new-project-card-body">
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
                                                        <span className="count">{productInfo[key].count}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="project-card-footer">
                        <Link className="card-nav-btn" to="/checkout/delivery" state={{ products, productInfo, totalAmount }}>Confirm And Continue</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
function Delivery() {
    const currentUser = useContext(AuthContext)
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [productInfo, setProductInfo] = useState([])
    const [newAddress, setNewAddress] = useState({
        showAddress: false,
        currentAddress: false,
    })
    const [accountInfo, setAccountInfo] = useState([])
    const [toSend, setToSend] = useState({
        mobileNumber: "",
        street: "",
        city: "",
        postalCode: "",
        suburb: "",
    });
    useEffect(() => {
        var cartItems = localStorage.getItem('cartsession');
        var productList = JSON.parse(cartItems);
        fecthData(productList)
        setProductInfo(productList)
    }, [])

    async function fecthData(data) {
        const quer = query(collection(db, "account"), where("userId", "==", currentUser.uid));

        const queryUser = await getDocs(quer);
        queryUser.forEach((docItem) => {
            setAccountInfo([docItem.data()]);
        }
        );
        let tempProducts = []
        for (let value of data) {
            const q = query(collection(db, "merch_products"), where("productId", "==", value.id));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((docItem) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                tempProducts.push(docItem.data());
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
    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    }
    const chooseCurrentAddress = () => {
        setNewAddress({ ...newAddress, currentAddress: true, showAddress: false });
    }
    const chooseNewAddress = () => {
        setNewAddress({ ...newAddress, currentAddress: false, showAddress: true });
    }
    function generateOrderId() {
        var orderId = "OID"
        const firstId3 = currentUser.uid.slice(0, 3).toUpperCase();
        console.log(currentUser.uid)
        var randomNum = Math.floor(Math.random() * 90000) + 10000;
        orderId += firstId3 + randomNum;
        return orderId;
    }
    const generatePayInfo = async () => {
        var orderId = generateOrderId();
        console.log(orderId);
        await setDoc(doc(db, "merch_preorders", currentUser.uid), {
            userId: currentUser.uid,
            totalAmount: totalAmount,
            orderId: orderId,
            orderDate: serverTimestamp(),
            products: products,
            productInfo: productInfo
        });
        navigate("/checkout/payment")
    }

    return (
        <>
            {
                (!accountInfo.length > 0) ? (
                    <Loader />
                ) : (
                    <div className="checkout-delivery">
                        <div className="progress-bar">
                            <p>Confirmation</p>
                            <hr className="seperator" />
                            <p className="active">Delivery</p>
                            <hr className="seperator" />
                            <p>Payment</p>
                            <hr className="seperator" />
                            <p>Successful</p>
                        </div>
                        <div className="new-project-card">
                            <div className="project-card-header">
                                <h5>Delivery</h5>
                            </div>
                            <div className="new-project-card-body">
                                <div className="free-delivery">
                                    <div className="delivery-near-uct">
                                        Free Delivery
                                    </div>
                                    <div className="delivery-amount">
                                        Free Delivery On Orders Above 500
                                    </div>
                                </div>
                                <div className="address-info">
                                    <div className="registered-address">
                                        <h3>Your Registered Address: </h3>
                                        <table className="table">
                                            <tbody>
                                                <tr >
                                                    <td className="key">Street Address: </td>
                                                    <td className="value">{accountInfo[0].address.street}</td>
                                                </tr>
                                                <tr>
                                                    <td className="key">Suburb: </td>
                                                    <td className="value">{accountInfo[0].address.suburb}</td>
                                                </tr>
                                                <tr>
                                                    <td className="key">City: </td>
                                                    <td className="value">{accountInfo[0].address.city}</td>
                                                </tr>
                                                <tr>
                                                    <td className="key">Postal Code: </td>
                                                    <td className="value">{accountInfo[0].address.postalCode}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="address-nav">
                                        <button onClick={chooseCurrentAddress} className={`btn ${newAddress.currentAddress && "selected"}`}>Choose The Registered Address</button>
                                        or
                                        <button onClick={chooseNewAddress} className={`btn ${newAddress.showAddress && "selected"} `}>Enter The A New Address</button>
                                    </div>


                                    <div className={`enter-delivery-address ${!newAddress.showAddress && "hide"}`}>
                                        <FormGroup>
                                            <Label style={{ fontWeight: "bold", margin: "0.5rem 0" }}>
                                                New Delivery Address
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
                                            <FormGroup style={{ display: 'flex' }}>
                                                <FormGroup style={{ marginRight: '10px', width: '80%' }}>
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
                                                <FormGroup style={{ width: '40%' }}>
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

                                    </div>
                                </div>
                            </div>
                            <div className="project-card-footer">
                                <button onClick={generatePayInfo} className="card-nav-btn" to="/checkout/payment">Continue</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
function Payment() {
    const [products, setProducts] = useState([])
    const [preOrderDetails, setPreOrderDetails] = useState({})
    const [customerInfo, setCustomerInfo] = useState({})
    const [productInfo, setProductInfo] = useState([])
    const [loading, setLoading] = useState(true)
    const currentUser = useContext(AuthContext)
    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const q = query(collection(db, "account"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docItem) => {
            // doc.data() is never undefined for query doc snapshots
            setCustomerInfo(docItem.data().personalInfo)
            // console.log(doc.id, " => ", doc.data().personalInfo.fullName);
        });
        const docRef = doc(db, "merch_preorders", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setPreOrderDetails(docSnap.data());
            setLoading(false)
            console.log("Document data:", docSnap.data());
        } else {
            setLoading(false)
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        // setTotalAmount(total)
    }
    return (
        <>{
            loading ? (
                <Loader />
            ) : (


                <div className="checkout-payment">
                    <div className="progress-bar">
                        <p >Confirmation</p>
                        <hr className="seperator" />
                        <p>Delivery</p>
                        <hr className="seperator" />
                        <p className="active">Payment</p>
                        <hr className="seperator" />
                        <p>Successful</p>
                    </div>
                    <div className="new-project-card">
                        <div className="project-card-header">
                            <h5>Payment</h5>
                        </div>
                        <div className="new-project-card-body">
                            <h4>Order Details</h4>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Order ID: </td>
                                        <td>{preOrderDetails.orderId}</td>
                                    </tr>
                                    <tr>
                                        <td>No. Of Items: </td>
                                        <td>{preOrderDetails.products.length}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Amount</td>
                                        <td>{preOrderDetails.totalAmount}</td>
                                    </tr>
                                    <tr>
                                        <td>Your Address:</td>
                                        <td>{preOrderDetails.totalAmount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <form className="project-card-footer" action="https://sandbox.payfast.co.za​/eng/process" method="post">
                            <input type="hidden" name="merchant_id" value="10000100" />
                            <input type="hidden" name="merchant_key" value="46f0cd694581a" />
                            <input type="hidden" name="return_url" value="http://localhost:3000/checkout/successful" />
                            <input type="hidden" name="cancel_url" value="http://localhost:3000/checkout/cancel" />
                            <input type="hidden" name="notify_url" value="http://localhost:3000/checkout/notify" />
                            <input type="hidden" name="name_first" value="John" />
                            <input type="hidden" name="name_last" value="Doe" />
                            <input type="hidden" name="email_address" value="john@doe.com" />
                            <input type="hidden" name="cell_number" value="0823456789" />
                            <input type="hidden" name="m_payment_id" value="01AB" />
                            <input type="hidden" name="amount" value={preOrderDetails.totalAmount} />
                            <input type="hidden" name="item_name" value="Test Item" />
                            <input type="hidden" name="item_description" value="A test product" />
                            <input type="hidden" name="email_confirmation" value="1" />
                            <input type="hidden" name="confirmation_address" value="john@doe.com" />
                            <input className="card-nav-btn" type="submit" value="Place Order" />
                        </form>
                    </div>
                </div>
            )
        }
        </>
    )
}
function Successful() {
    return (
        <>
            <div className="checkout-successful">
                <div className="progress-bar">
                    <p >Payment Successful</p>
                    <hr className="seperator" />
                    <p>Delivery</p>
                    <hr className="seperator" />
                    <p>Payment</p>
                    <hr className="seperator" />
                    <p className="active">Successful</p>
                </div>
                <div className="new-project-card">
                    <div className="project-card-header">
                        <h5>Payment Successful</h5>
                    </div>
                    <div className="new-project-card-body">
                        <h4>Order Placed</h4>
                        <p className="thank-you">Thank You For Placing Order Expect Your Items To Be Delivered Between 2 - 3 Weeks</p>
                        <div className="order-info">
                            <div className="order-id">
                                 <p>orderId</p>
                                 <h4>{`orderId`}</h4>
                            </div>
                            <Link to={`/account/orders/orderId`} className="track-order">
                                Track Order
                            </Link>
                        </div>
                        <Link to="/" className="continue-shopping">
                            Continue Shopping
                        </Link>
                    </div>
                    <div className="project-card-footer">

                    </div>
                </div>
            </div>
        </>
    )
}
