import { useState, useEffect, React} from "react";
import { Link, } from "react-router-dom";
import axios from "axios";
import Review from "./Review";
import NavBar from "./Navbar";

const Home = () => {
const URL = "http://localhost:3000";

const [auth, setAuth] = useState(null); // null means loading, false means not authenticated
const [error, setError] = useState(null); // to display error messages
const [activeUser, setActiveUser] = useState(null);

  // Check authentication status when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/checkAuth", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setActiveUser(response.data.user);
          console.log(activeUser);
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
    console.log("Fetched Reviews:", reviews); 
    setReviews(reviews);
  }catch (err) {
    console.log(err);
}
};
fetchReviews();
}, []);


  return (
    <div>
      {/* Links replace anchor tags */}      
      <NavBar auth={auth} />
    <br/>

    {ReviewsList.map((review) => {
  return (
    <div key={review.ReviewID}> {/* Add the key here */}
      <Review
        title={review.title}
        Rating={review.Rating}
        CreatedBy={review.CreatedBy}
        Genre={review.Genre}
        imageUrl={review.imageUrl}
        review={review.description}
        auth={auth}
        id={review.ReviewID}
      />
    </div>
  );
})}




    </div>
  );
};

export default Home;  
