import User from "../models/User.js";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }


    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    // password check 


    const exists = await User.findOne({email});
    if (exists) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

  
    const token = jwt.sign(
        { id: user._id.toString() },
         process.env.JWT_SECRET, 
        { expiresIn: process.env.TOKEN_EXPIRES_IN
    });



    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        token,
      },
    });

  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};




export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
   
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

 
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

  
    const token = jwt.sign(
        { id: user._id.toString() }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.TOKEN_EXPIRES_IN  }
);

  
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        token,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
