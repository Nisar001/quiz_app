// src/components/AddQuestion.js
import React, { useState } from 'react';
import { addQuestion } from '../services/api';

const AddQuestion = () => {
  const [questionText, setQuestionText] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!questionText || !option1 || !option2 || !option3 || !option4 || !correctAnswer) {
      setError('Please fill out all fields');
      return;
    }

    try {
      const questionData = {
        questionText,
        options: [option1, option2, option3, option4],
        correctAnswer,
      };

      await addQuestion(questionData);
      setSuccess('Question added successfully!');
      setError('');
      clearForm();
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  const clearForm = () => {
    setQuestionText('');
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
    setCorrectAnswer('');
  };

  return (
    <div className="add-question-form">
      <h2>Add New Quiz Question</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </div>

        <div>
          <label>Option 1:</label>
          <input
            type="text"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
          />
        </div>

        <div>
          <label>Option 2:</label>
          <input
            type="text"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
          />
        </div>

        <div>
          <label>Option 3:</label>
          <input
            type="text"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
          />
        </div>

        <div>
          <label>Option 4:</label>
          <input
            type="text"
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
          />
        </div>

        <div>
          <label>Correct Answer:</label>
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </div>

        <button type="submit">Add Question</button>
      </form>
    </div>
  );
};

export default AddQuestion;
