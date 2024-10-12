// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/quiz';  // Your backend API URL

export const addQuestion = async (question, options, answer) => {
  try {
    const response = await axios.post(`${API_URL}/create`, question, options, answer);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error adding question');
  }
};
