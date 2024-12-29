import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const NavBar = ({ auth }) => {
  return (
    <nav className={styles.navbar}>
      <img 
      src=""  >   
      </img>
      <ul className={styles.navList}>
        {auth ? (
          // Links displayed when authenticated
          <>

          <li className={styles.profilePicture}>
            <img src="/ProfilePictures/pic4.JPG" alt="Profile Pic"/>
            </li>
           <li className={styles.navItem}><Link to="/">Home</Link></li>
            <li className={styles.navItem}><Link to="/profile">Profile</Link></li>
            <li className={styles.navItem}><Link to="/logout">Logout</Link></li>
            {/* <li className={styles.navItem}><Link to="/deleteEditReview">Delete Review</Link></li> */}
            <li className={styles.navItem}><Link to="/addNewReview">Add New Review</Link></li>
            
          </>
        ) : (
          // Links displayed when not authenticated
          <>
            <li className={styles.navItem}><Link to="/">Home</Link></li>
            <li className={styles.navItem}><Link to="/signup">Signup</Link></li>
            <li className={styles.navItem}><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default NavBar;
