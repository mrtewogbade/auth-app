
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import {errorHandler} from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup =  async (req, res, next) => {

    try{
        const { username, email, password } = req.body; 
        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save()
        res.status(201).json({message: 'User created successfully'});




    }catch( error){
        next(error)

    }
}

export const signin = async (req, res, next) => {
    
    const { email, password } = req.body;
    
    try{

        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, "Invalid credentials"))
        
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(401, "wrong credentials"));
        const token = jwt.sign({ id: validUser.id}, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;

        const expiryDate = new Date(Date.now() + 3600000); // 1 hr

        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }) // the age allows users to stay longer when logged in
        .status(200)
        .json(rest);
    }catch(error){
        next(error)
    }
}

export const google = async (req, res, next) => {
    
    try{
        const user = await User.findOne({ email: req.body.email });

    if( user ){
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = user._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hr
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
    }else{

        const generatedPassword = Math.random().toString(36).slice(-8); // generate a random password
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
            username: req.body.name.split(" ").join('').toLowerCase() + Math.random().toString(36).slice(-8),  
            email: req.body.email,
            password: hashedPassword,
            photoURL: req.body.photoURL,

        });

        await newUser.save();
        const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET);
        const { password: hashedPassword2, ...rest } = newUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hr
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);



        
    }

    }catch(error){
        next(error)
    }

}
