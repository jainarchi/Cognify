import jwt from 'jsonwebtoken';
import User from '../models/User.js'


const authMiddleware = async (req , res , next) => {
//    console.log('enter in auth middleware')
    let token = req.headers.authorization?.split(" ")[1];
    if( ! token ){ 
        return res.status(401).json({message: "Not authorized, no token."})
    }
        
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        console.log('goes to controller ')
        next();

    }catch(err){
        res.status(401).json({message: "Not Authorized, token failed."})
    }


}

export default authMiddleware ;