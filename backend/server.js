import express from "express";
import morgan from "morgan";
import cors from "cors";
import AuthRouter from './routes/authRoutes.js'
import QuizRoutes from './routes/quizRoutes.js'
import { ConnectDB } from "./config/ConfigDB.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB connection
ConnectDB()

// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/quiz", QuizRoutes)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan.white);
});
