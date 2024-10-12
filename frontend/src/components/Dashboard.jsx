// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();  // Updated from useHistory to useNavigate

  const handleStartQuiz = () => {
    navigate('/quiz');  // Updated from history.push to navigate
  };

  const handleAddQuestion = () => {
    navigate('/add-question');  // Updated from history.push to navigate
  };

  return (
    <div className="dashboard">
      <h2>Welcome to the Admin Dashboard</h2>
      <button className="btn" onClick={handleStartQuiz}>Start Quiz</button>
      <button className='btn' onClick={handleAddQuestion}>Add New Question</button>
    </div>
  );
};

export default Dashboard;
