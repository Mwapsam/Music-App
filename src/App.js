import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, About, Login, Signup } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <div>
      <Navbar />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
    
  );
}

export default App;
