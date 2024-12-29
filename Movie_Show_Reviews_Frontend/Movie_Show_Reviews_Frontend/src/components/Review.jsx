import React from "react";
import Stars from "./Stars";
import styles from "../styles/Reviews.module.css";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";


function Review(props){




  const DeleteReview = (id) => {


    axios
      .delete(`http://localhost:3000/reviews/${id}`, {withCredentials: true})
      .then((response) => {
        console.log(id);
        console.log(response);
        if (response.status === 401) {  
          alert("You need to be logged in to delete a review.");
        }else if(response.status === 200){
          alert("Review deleted successfully");
          window.location.reload();
        }else{
          alert("Failed to delete review");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
    return (
      <>
      <div className={styles.container}>
        <div className={styles.title}>

      <h2>{props.title}</h2>
      <Stars rating= {props.Rating}/>
      <h4> Written By: {props.CreatedBy}</h4>
      <h4>Genre: {props.Genre}</h4>
      </div>

      <div className={styles.content}>

      <h4>{props.review}</h4>

      {props.auth && (
        <div className={styles.delete}>
          <button id={props.id} onClick={() => DeleteReview(props.id)}><DeleteIcon /></button>
        </div>    
      )
    }
      </div>
      
      </div>
      </>
    )
}

export default Review;