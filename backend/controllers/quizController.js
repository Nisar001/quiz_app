// controllers/quizController.js
import Joi from 'joi';
import Question from '../models/question.js'; // Assuming you have a Quiz model

// Validation schemas
const quizSchema = Joi.object({
    question: Joi.string().min(5).required(),
    options: Joi.array().items(Joi.string()).min(2).required(), // At least two options
    answer: Joi.string().required(),
});

export const createQuestion = async (req, res) => {
    const { error } = quizSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { question, options, answer } = req.body;

    const newQuestion = new Question({ question, options, answer });
    try {
        await newQuestion.save();
        res.status(201).json({ message: 'Question created successfully', question: newQuestion });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
