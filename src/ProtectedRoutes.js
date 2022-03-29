import React, {useState, useEffect, createContext, useContext} from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import {AuthContext} from './AuthProvider'


export const ProtectedRoutes = () => {
    const currentUser  = useContext(AuthContext);
    const location = useLocation()
  
    if (!!currentUser) {
        return <Outlet /> 
    }
    return <Navigate to="/login" state={{from: location}} />;
}

