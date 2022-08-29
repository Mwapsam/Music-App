import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, About, Login, Signup, AddMusic, AdminPlayList } from "./pages";
import { Navbar, EmailVerification, Player, Private, AddCategory, Category } from "./components";

function App() {
  return (
    <div>
      <Navbar />
      <Routes >
        {/* <Route path="/" element={(<Private><Home /></Private>)} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/add-music" element={(<Private><AddMusic /></Private>)} /> */}
        <Route path="/add-music/:name" element={<AddMusic />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/music/:name" element={<Player />} />
        <Route path="/admin-playlist" element={(<Private><AdminPlayList /></Private>)} />
        <Route path="/admin-playlist" element={<AdminPlayList />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </div>
    
  );
}

export default App;
