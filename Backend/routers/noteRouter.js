import express from "express";
import { createNote, getMyNotes, deleteNote } from '../controllers/noteController.js'
import authMiddleware from '../middlewares/auth.js'

const router = express.Router();



router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getMyNotes);
router.delete("/:id", authMiddleware, deleteNote);



export default router;