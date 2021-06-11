import "./index.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/Search">Search</Link>
        <Link to="/MyList">MyList</Link>
        <Link to="/RandomMovieGenerator">Random Movie Generator</Link>
      </div>
    </nav>
  );
};

export default Navbar;
