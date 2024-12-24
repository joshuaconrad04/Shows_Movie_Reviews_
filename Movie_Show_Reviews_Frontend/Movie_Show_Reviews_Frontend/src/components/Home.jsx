import { useState, useEffect, React} from "react";
import { Link, } from "react-router-dom";
import axios from "axios";

const Home = () => {
const URL = "http://localhost:3000";

const [auth, setAuth] = useState(null); // null means loading, false means not authenticated
const [error, setError] = useState(null); // to display error messages

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

const [ReviewsList, setReviewsList] = useState([]);

function setReviews(data) {
  setReviewsList(data);
}

useEffect(()=>{
const fetchReviews = async () => {
  try {
    const response = await fetch(URL+"/reviews");
    if(!response.ok){
      throw new Error("Network response was not ok");
    }
    const reviews = await response.json();
    setReviews(reviews);
  }catch (err) {
    console.log(err);
}
};
fetchReviews();
}, []);


  return (
    <div>
      <Link to="/">Home</Link>
      {/* Links replace anchor tags */}
      
      {auth ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/logout">Logout</Link>
        </>
      ) : (
        <>
          <Link to="/signup">Signup </Link>
          <Link to="/login">Login</Link>
        </>
      )}      
      
    <br/>

    {ReviewsList.map((review) => {
  return (
    <div key={review.reviewID}> {/* Add the key here */}
      <h1>{review.title}</h1>
      <p>{review.review}</p>
      <ol>
        <li>{review.CreatedBy}</li>
        <li>{review.Rating}</li>
        <li>{review.Genre}</li>
        <li>{review.imageUrl}</li>
      </ol>
    </div>
  );
})}




    </div>
  );
};

export default Home;  
