import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Home Page</h1>
      <p>Welcome to the home page.</p>
      <Link to="/about">Go to About Page</Link>
      <br />
      <Link to="/contact">Go to Contact Page</Link>
    </div>
  );
};

export default HomePage;
