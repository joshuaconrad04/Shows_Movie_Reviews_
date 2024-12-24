import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch profile data from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/profile", { withCredentials: true })
      .then((response) => {
        console.log("Response data:", response.data); // Adjust to your backend structure
        setUserData(response.data); // Assuming the response contains user data directly
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data. Please try again.");
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
      <h1>Welcome to Profile</h1>
      <h2>{userData.user.Username}</h2> {/* Assuming `Username` is a property */}
      <h3>{userData.user.UserID}</h3> {/* Assuming `UserID` is a property */}
      <Link to="/logout"><button>Logout</button></Link>
    </>
  );
}

export default Profile;
