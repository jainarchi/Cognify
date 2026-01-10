import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from './config/db.js'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.get("/", (req, res) => {
  res.json({ message: "Hello from Express!" });
});



connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB, server not started", err);
  });