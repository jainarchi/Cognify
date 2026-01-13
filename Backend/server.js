import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from './config/db.js'
import authRouter from './routers/authRouters.js'
import resultRouter from "./routers/resultRoutes.js";
import questionRouter from './routers/questionRouters.js'

dotenv.config();
console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);


const app = express();
const PORT = process.env.PORT || 4000;


app.use(
    cors({
        origin: process.env.CLIENT_URL || '*',
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();


app.use('/api/auth' , authRouter);
app.use('/api/results' , resultRouter)
app.use('/api/questions', questionRouter);






app.get("/", (req, res) => {
  res.json({ message: "Hello from Express!" });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
