// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Updated from Switch to Routes
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import AddQuestion from './components/AddQuestion';
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>  {/* Updated from Switch to Routes */}
          <Route path="/" element={<Home />} />  {/* Updated from component to element */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/add-question" element={<AddQuestion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
