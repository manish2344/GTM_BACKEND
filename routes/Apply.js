const ApplyController = require('express').Router()
const Apply = require('../models/Apply')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

// ApplyController.post('/login', async (req, res) => {
//     try {
//         const user = await User.findOne({email: req.body.email})
//         if(!user){
//             throw new Error("Invalid credentials")
//         }
//         // if (user && (await user.matchPassword(password)))
//         const comparePass = await user.matchPassword(req.body.password)
//         if(!comparePass){
//             throw new Error("Invalid credentials")
//         }
//         const token = jwt.sign({id: user._id}, process.env.TOKEN, {expiresIn: '5h'})        
//         res.cookie('jwt', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
//             sameSite: 'strict', // Prevent CSRF attacks
//             maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//           });
//           const userdata={
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//         }
//         res.status(200).json({userdata,token})
//         // return res.status(200).json({userinfo: userinfo, token})
//     } catch (error) {
//         return res.status(500).json(error.message) 
//     }
// })






// authController.post('/logout', async (req, res) => {
//     res.cookie('jwt', '', {
//         httpOnly: true,
//         expires: new Date(0),
//       });
//       res.status(200).json({ message: 'Logged out successfully' });
  
// })
authController.post('/resumesubmit', async (req, res) => {
    // const { name, email, password } = req.body;
try{
    const applyExists = await Apply.findOne({ email :req.body.email});
  
    if (applyExists) {
      res.status(400);
      throw new Error(' already applied');
    }
  
    const applydata = await Apply.create({...req.body});
    const {...others} = applydata._doc
    const token = jwt.sign({id:applydata._id}, process.env.TOKEN, {expiresIn: '5h'})
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
    res.status(201).json({applydata: others, token})
}catch (error) {
        return res.status(500).json(error.message)
    }
  
})
//   
module.exports = authController