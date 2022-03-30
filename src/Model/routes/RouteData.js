import React from 'react'

import Home from "../../View/screens/public-screens/Home"
import Products from "../../View/screens/public-screens/Products"
import ProductItem from "../../View/screens/public-screens/ProductItem"

import Error from '../../View/screens/404'

import Cart from '../../View/screens/public-screens/Cart'
import Orders from '../../View/screens/private/accountPages/Orders'
import Checkout from '../../View/screens/private/Checkout'
import Invoices from '../../View/screens/private/accountPages/Invoices'

// useful links
import Contact from '../../View/screens/public-screens/useful-links/Contact'
import ProductSuggestion from '../../View/screens/public-screens/useful-links/ProductSuggestion'

// ========== Private ==============
import User from "../../View/screens/private/UserAccount"
import Admin from "../../View/screens/private/Admin"
import ResetPassword from "../../View/screens/public-screens/auth/ForgetPassword"
import Login from "../../View/screens/public-screens/auth/Login"
import Register from "../../View/screens/public-screens/auth/Register"
import AccountLinks from "../../View/screens/private/AccountLinks"

import Success from '../../View/payments/Success'
import Cancel from '../../View/payments/Cancel'
import Notify from '../../View/payments/Notify'

import PushToDatabase from '../../Controller/PushToDatabase'
import OrderItem from '../../View/screens/private/accountPages/OrderItem'

const home = {
    path: "/",
    component: < Home / >
};



const PublicRoutes = [
    {
        path: "/products/:slug/:id",
        component: < ProductItem / >
    },
    {
        path: "/register",
        component: < Register / >
    },
    {
        path: "/login",
        component: < Login  / >
    },
    {
        path: "/reset-password",
        component: <ResetPassword / >
    },

    {
        path: "/404",
        component: <Error / >
    },


    {
        path: "/contact",
        component: <Contact / >
    },
    {
        path: "/product-suggestion",
        component: <ProductSuggestion / >

    },

    {
        path: "/push-data",
        component: <PushToDatabase / >
    },
    {
        path: "/cart",
        component: <Cart / >
    },
    {
        path: "/payments/success",
        component: <Success / >
    },
    {
        path: "/payments/cancel",
        component: <Cancel / >
    },
    {
        path: "/payments/notify",
        component: <Notify / >
    },

];

const PrivateRoutes = [
    {
        path: "/account",
        component: <User / >
    },
    {
        path: "/account/:page",
        component: <AccountLinks / >
    },
    {
        path: "/admin",
        component: <Admin / >
    },
    {
        path: "/orders",
        component: <Orders / >
    },
    {
        path: "/checkout/:step",
        component: <Checkout / >
    },
    {
        path: "/account/orders/:orderId",
        component: <OrderItem / >
    },

]

export { home, PrivateRoutes, PublicRoutes }