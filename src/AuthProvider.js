import React, {useState, useEffect, createContext, useContext} from 'react'
import { Outlet, Navigate } from 'react-router'
import {auth} from './Model/setup/firebase'


export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [pending, setPending] = useState(true)
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        })
    })
    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    );
}