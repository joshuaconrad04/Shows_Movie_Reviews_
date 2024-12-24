import {useState, React} from 'react';
import { Form, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

const [username, setUsername]=useState("");
const [password, setPassword]=useState("");

//change handler username and password
const handleUsernameChange = (event) => {
  setUsername(event.target.value);
};
const handlePasswordChange = (event) => {
  setPassword(event.target.value);
};

const Navigate = useNavigate();

//clear the username and password
function clearForm() {
  setUsername("");
  setPassword("");
};
  
const handleSubmit = async (event) => {
  event.preventDefault();
  // Post data manually
  try{
    const response= await axios.post("http://localhost:3000/register", 
{
  username: username,
  password: password
}
    );
    if(response.status === 201){
      alert("Registration successful");
      Navigate("/login");
    }else{
      alert("Registration failed"); 
    }
  }catch(err){
    if(err){
      console.log(err)
    }
  }
  clearForm();
};


  return (
    <div>
      <h1>Signup</h1>
      <Link to="/login">Login</Link>

<form onSubmit={handleSubmit}>
       <TextField
       id="login-field"
       label="username"
       value={username}
       onChange={handleUsernameChange}
       ></TextField>
      <br></br>

      <TextField
       id="password-field"
       label="Password"
       type="password"
       value={password}
       autoComplete="current-password"
       onChange={handlePasswordChange}
       ></TextField>

    {/* // Submit button inorder to submit form to be registered in order to register new user */}
        <button type="submit">Submit</button>
    </form>
    </div>
  );
};
export default Signup;