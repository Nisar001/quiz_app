import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timer, setTimer] = useState(600); // 10 minutes countdown
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(''); // To show validation errors
  const [fetchError, setFetchError] = useState(null); // For API fetch error

  // Fetch quiz questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/quiz/get');
        console.log('Fetched questions:', response.data); // Log the data
        setQuestions(response.data);
      } catch (error) {
        setFetchError('Failed to fetch quiz questions. Please try again.');
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();

    // Timer logic
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    // Auto-submit when time runs out
    if (timer === 0) {
      handleSubmitQuiz();
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  // Format the timer
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Handle option selection
  const handleOptionSelect = (questionId, option) => {
    setError(''); // Clear any previous errors
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  // Handle moving to the next question
  const handleNextQuestion = () => {
    if (!selectedOptions[questions[currentQuestionIndex]._id]) {
      setError('Please select an option before proceeding.');
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle quiz submission
  const handleSubmitQuiz = async () => {
    if (!selectedOptions[questions[currentQuestionIndex]?._id]) {
      setError('Please select an option before submitting.');
      return;
    }

    alert('Submitting your quiz...');
    setIsSubmitted(true);

    const submissionData = {
      answers: selectedOptions,
      timeTaken: 600 - timer, // time taken in seconds
    };

    try {
      await axios.post('http://localhost:8080/api/quiz/submit', submissionData);
      alert('Quiz submitted successfully!');
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  // Display loading screen while questions are fetched
  if (!questions.length && !isSubmitted) {
    return (
      <div>
        {fetchError ? (
          <p style={{ color: 'red' }}>{fetchError}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }

  // Display a thank you screen after submission
  if (isSubmitted) {
    return <div>Thank you for completing the quiz!</div>;
  }

  return (
    <div className="quiz-page">
      <h2>Quiz</h2>
      <p>Time remaining: {formatTime(timer)}</p>
      <div className="question">
        <h3>{questions[currentQuestionIndex]?.question}</h3>
        <ul>
          {questions[currentQuestionIndex]?.options.map((option, index) => (
            <li
              key={index}
              style={{
                cursor: 'pointer',
                backgroundColor:
                  selectedOptions[questions[currentQuestionIndex]?._id] === option
                    ? 'lightgray'
                    : 'transparent',
              }}
              onClick={() =>
                handleOptionSelect(questions[currentQuestionIndex]?._id, option)
              }
            >
              {option}
            </li>
          ))}
        </ul>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display validation error */}

      <div>
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            onClick={handleNextQuestion}
            disabled={!selectedOptions[questions[currentQuestionIndex]?._id]}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmitQuiz}
            disabled={isSubmitted || !selectedOptions[questions[currentQuestionIndex]?._id]} // Disable if already submitted or no option selected
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
