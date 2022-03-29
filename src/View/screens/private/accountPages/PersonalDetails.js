import React, { useEffect, useState, useContext } from 'react'
import { db } from '../../../../Model/setup/firebase'
import { Link } from 'react-router-dom'
import Loader from "../../../../Controller/Loader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {AuthContext} from "../../../../AuthProvider"
import { collection, query, where, getDocs } from "firebase/firestore";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

const PersonalDetails = () => {
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState({});
    const currentUser = useContext(AuthContext)
    async function fetchData() {
        const q = query(collection(db, "account"), where("userId", "==", currentUser.uid));
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setUserDetails(doc.data().personalInfo)
          setLoading(false)
        });
      }
      useEffect(() => {
        fetchData();
      }, [currentUser]);
    return (
        <>
            {
                loading ?
                    <Loader /> :
                    <section className="all-projects-user-details">
                        <div className="projects-title">
                            <h1> <Link to="/dashboard"><FontAwesomeIcon style={{ marginRight: '10px', fontSize: '20px' }} icon={faArrowLeft} /></Link> Personal Details</h1>
                        </div>
                        <div className="personal-details">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Full Name:</td>
                                        <td className="value">{userDetails.fullName}</td>
                                        <td className="links">Edit</td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td className="value">{userDetails.email}</td>
                                        <td className="links">Edit</td>
                                    </tr>
                                    <tr>
                                        <td>Phone Number:</td>
                                        <td className="value">{userDetails.mobileNumber}</td>
                                        <td className="links">Edit</td>
                                    </tr>
                                    <tr>
                                        <td>Password:</td>
                                        <td className="value">{new Array(userDetails.password.length + 1).join("*")}</td>
                                        <td className="links">Reset</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
            }
        </>
    )
}

export default PersonalDetails
