import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import styles from "../styles/BasicStyles.module.css";


function Logout() {
  const [auth, setAuth] = useState(null); // null means loading, false means not authenticated
  const [error, setError] = useState(null); // to display error messages
  const navigate = useNavigate();

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

  // Handle logout when the user clicks the logout button
  const handleLogout = () => {
    axios
      .get("http://localhost:3000/logout", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setAuth(false); // mark user as logged out
          navigate("/login"); // redirect to login page
        }
      })
      .catch((err) => {
        console.error("Error logging out", err);
        setError("Logout failed. Please try again.");
      });
  };

  // Handle UI while loading or showing error
  if (auth === null) {
    return <h1>Loading...</h1>; // show loading state while checking auth status
  }

  if (error) {
    return <h1>{error}</h1>; // show error message if any
  }

  return (
    <>
     <NavBar auth={auth} />
      {auth ? (
        <>
        <h2> Click Button to Logout</h2>
        <button onClick={handleLogout}>Logout</button> // show logout button if authenticated
        </>
      ) : (
        
        <Link to="/login">Login</Link> // show login link if not authenticated
      )}
    </>
  );
}

export default Logout;
