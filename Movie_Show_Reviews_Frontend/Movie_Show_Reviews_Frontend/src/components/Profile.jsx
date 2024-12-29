import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import NavBar from "./Navbar";
import styles from "../styles/BasicStyles.module.css";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(null); // null means loading, false means not authenticated
  // Fetch profile data from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/checkAuth", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setUserData(response.data);
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




  // Handle error
  if (error) {
    return <h1>{error}</h1>;
  }

  // Handle loading state
  if (!userData) {
    return <h1>Loading...</h1>;
  }

  // Render profile data
  return (
    <>
     <NavBar auth={auth} />
      <h1>Welcome to your profile {userData.user.Username}</h1>
      <Link to="/logout"><button>Logout</button></Link>
    </>
  );
}

export default Profile;
