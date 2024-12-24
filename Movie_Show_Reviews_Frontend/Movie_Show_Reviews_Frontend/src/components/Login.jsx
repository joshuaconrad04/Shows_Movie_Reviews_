import {React, useState} from "react";
import axios from "axios";
import { Link, redirect, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";




const Login = () =>{

  const navigate = useNavigate();

const [username, setUsername]=useState("");
const [password, setPassword]=useState("");

//change handler username and password
const handleUsernameChange = (event) => {
  setUsername(event.target.value);
  console.log(username);
};
const handlePasswordChange = (event) => {
  setPassword(event.target.value);
  console.log(password);
};

//clear the username and password
function clearForm() {
  setUsername("");
  setPassword("");
};


const handleSubmit = async (event) => {
  event.preventDefault();
  // Post data manually
  try {  
    const response= await axios.post("http://localhost:3000/login", 
    { username: username, password: password},
    {withCredentials:true}
    );
    alert("Login successful");
    if (response.status === 200) {
      navigate("/profile");

    }
  }catch(err){
    if(response.status === 401){
      alert("Username or password is incorrect")
    }else{
      console.log(err)
    }
  }
  clearForm();  
    }



return(

<div>
  <h1>Login</h1>


<form onSubmit={handleSubmit}>
  <TextField
  id="username_field"
  label="username"
  onChange={handleUsernameChange}
  value={username}
></TextField>
      <br></br>
      <TextField
       id="password_field"
       label="Password"
       type="password"
       onChange={handlePasswordChange}
       value={password}
       ></TextField>
  <br/>
  <button type="submit">Login</button>
</form>
</div>

)
};

export default Login;