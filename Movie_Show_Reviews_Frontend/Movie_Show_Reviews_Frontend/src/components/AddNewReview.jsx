import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link , useNavigate} from "react-router-dom";
import NavBar from "./Navbar";
import styles from "../styles/AddNewReview.module.css";

function AddNewReview() {

  const [title  , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [rating , setRating] = useState("");
  const [genre , setGenre] = useState("");
  const [imgUrl , setImgUrl] = useState("");
 
  const navigate =useNavigate();

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


  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/reviews", 
        {
        title,
        description,
        rating,
        genre,
        imgUrl
        }
      ,
       {withCredentials: true})
      .then((response) => {
        console.log(response.data);

        if (response.status === 401) {
          alert("You need to be logged in to add a review.");
        }else if(response.status === 201){
          alert("Review added successfully");
          // redirect to the reviews page
          navigate("/");
        }else{
          alert("Failed to add review");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };






  return (
    <>

      <NavBar auth={auth} />
      <h1 style={{ textAlign: "center" }}>Add New Review</h1>

      {auth?(
      <>
        {/* // input form with a space to write the title, Rating, Genre, image url and review description of a new review */}

        <form className={styles.reviewForm}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter the title of your review"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            placeholder="Rate from 1 to 5"
            value={rating}
            required
            onChange={(event)=> setRating(event.target.value)}
          />

          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="Enter the genre of the review"
            value={genre}
            required
            onChange={(event) => setGenre(event.target.value)}
          />

          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            placeholder="Enter the image URL for your review"
            value={imgUrl}
            onChange={(event) => setImgUrl(event.target.value)}
          />

          <label htmlFor="description">Review:</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            placeholder="Write your review here"
            value={description}
            required
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>

          <button type="submit" onClick={handleSubmit}>Submit Review</button>
        </form>

      </>
      ):(
        <p style={{ textAlign: "center" }}>
          You are not authenticated. Please{" "}
          <Link to="/login">login</Link> or{" "}  
          <Link to="/signup">signup</Link> to add a new review.
        </p>
    )
  }


    </>
  );
};

export default AddNewReview;