import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the Quiz Application</h1>
      <p>Sign up or log in to take the quiz.</p>
      <Link to="/signup" className="btn">Signup</Link>
      <Link to="/login" className="btn">Login</Link>
    </div>
  );
};

export default Home;
