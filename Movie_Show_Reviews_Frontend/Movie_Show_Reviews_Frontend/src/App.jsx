import React from "react";
import { Route, Routes  } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/profile";
import NotFound from "./components/NotFound";
import Logout from "./components/Logout";


function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home Page */}
          <Route path="/login" element={<Login />} /> {/* Login Page */}
          <Route path="/signup" element={<Signup />} /> {/* Signup Page */}
          <Route path="/profile" element={<Profile />} /> {/* Profile Page */}
          <Route path="/Logout" element={<Logout />} />
          <Route path="*" element={<NotFound/>} />

          
        </Routes>
        </>
  );
}

export default App;
