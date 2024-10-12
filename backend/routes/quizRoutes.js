// routes/quiz.js
import express from 'express';
import { createQuestion, getQuestions } from '../controllers/quizController.js';
import { verifyToken } from '../middlewares/auth.js'; // Assume you have a middleware for token verification

const router = express.Router();


router.post('/create', createQuestion); // Token verification middleware
router.get('/get', getQuestions);

export default router;
