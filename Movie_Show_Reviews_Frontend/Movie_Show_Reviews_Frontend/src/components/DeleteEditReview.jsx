import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import styles from "../styles/Delete.module.css";

function DeleteEditReview(){
    const [auth, setAuth] = useState(null); // null means loading, false means not authenticated
    // Check authentication status when the component mounts
    useEffect(() => {
        axios
            .get("http://localhost:3000/checkAuth", { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    setAuth(true); // user is authenticated
                } else {
                    setAuth(false); // user is not authenticated
                }
            })
            .catch((err) => {
                setAuth(false); // if error occurs, assume user is not authenticated
                setError("Failed to load authentication status.");
            });
    }, []); 

    return (
        <>
        <NavBar auth={auth} />
        <h1 style={{textAlign:"center"}}>Delete Review</h1>


        












        </>
    );
};   

export default DeleteEditReview;