import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, About } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <div>
      <Navbar />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> 
      </Routes>
    </div>
    
  );
}

export default App;
