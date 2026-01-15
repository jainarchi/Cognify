import express from 'express'
import { aiAnalyzeWrongAnswers } from '../controllers/aiAnalyzeWrongAnsController.js'
import authMiddleware from '../middlewares/auth.js'


const router = express.Router();

router.post('/wrongans' ,  authMiddleware ,aiAnalyzeWrongAnswers)


export default router ;

