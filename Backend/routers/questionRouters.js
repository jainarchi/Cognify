import express from "express";
import { getRandomQuestions } from "../controllers/questionController.js";

const router = express.Router();

router.get("/", getRandomQuestions);

export default router;
