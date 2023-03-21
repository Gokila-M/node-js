import bcrypt from "bcrypt";
import { captialFirstLetter } from "../config/capitalLetter.js";
import User, { validateUser } from "../models/user.js";
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";

export const userReg = async (req, res) => { 
    let email=req.body.email;
    let password = req.body.password; 
    let firstName = captialFirstLetter(req.body.firstName);
    let lastName = captialFirstLetter(req.body.lastName);
    let saltRounds=10;
    const val = validateUser(req.body);
    if (val) return res.status(400).json({ message: val.error });
    if (!password) return res.status(400).json({ message: "please enter password" }); 
    let exUserPhone = await User.findOne({ mobileNo: req.body.mobileNo });
    if (exUserPhone)  return res.status(400).json({ message: "Phone No already exists" });
    let exUserEmail = await User.findOne({ email: email });
    if (exUserEmail)  return res.status(400).json({ message: "email already register" });    
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    let register = new User({       
     email: email,
     password: hash,
     firstName: firstName,
     lastName: lastName,
     dob: req.body.dob,
     gender: req.body.gender?.toLowerCase(),
     bloodGroup: req.body.bloodGroup,       
     mobileNo: req.body.mobileNo,
    
    });
    try {
        let User = await register.save();
        res.status(201).json({ message:"Register Sucessfully"});
      } catch (error) {
        res.status(400).json({ message:error.message });
      }
    });
  };
  export const login = async (req, res) => {
    let email = req.body.email;
    let password =req.body.password;
    let foundUser = await User.findOne({ email: email });
    if (!email) return res.status(400).json({ message: "please enter email" });
    if (!password) return res.status(400).json({ message: "please enter password" });
    if (foundUser) {
    if (foundUser.isAdmin == false && foundUser.isBlock == true) return res.status(400).json({ message: "your are blocked user" });      
    bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
    if (result) {
      try {
        const token = jwt.sign({ id:foundUser?._id }, process.env.JWT,);
        res.header("auth-token", token).json({ message: "login successfully", token: token });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
    else {
        res.status(400).json({ message: "please enter correct password" });
      }
    });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  };

  export const otpGenrate = async (req, res) => {
    const { email, mobile } = req.body;
  
    // Generate OTP
    const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
  
    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'gokila1331@gmail.com',
        pass: '02D5BCB74AB3A7C75EBAC62D4F7F9F2D44DD'
      }
    });
  
    // Set up email options
    const mailOptions = {
      from: 'gokila1305@gmail.com',
      to: email,
      subject: 'Your One-Time Password',
      text: `Your One-Time Password is: ${otp}`
    };
  
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending OTP');
      } else {
        console.log('Email sent: ' + info.response);
  
        // Send OTP to mobile
        // Code for sending OTP to mobile goes here
  
        res.status(200).send('OTP sent successfully');
      }
    });
  }

  export const userUpdate = async (req, res) => {
    let  id  = req.query.id;
    const exuser = await User.findOne({_id:id});
    try {
      if (!id) {
        return res.status(400).json({ message: "Please Provide A Id In Query" });
      }
      if (!exuser) {
        return res.status(400).json({ message: "User Not Found" });
      }   
      await User.findByIdAndUpdate({ _id: id },{$set: req.body},{ new: true });
      return res.status(200).json({ message: "User Data Updated Successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  export const getAllUser = async (req, res) => {
   try {
      const user = await User.find({})
      return res.status(200).json({ data:user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
 };
export const getuserById = async (req, res) => {
    let id = req.params.id
    try {
      const users = await User.findById({ _id:id });
      if (!users) return res.status(404).json({ message: "User Not Found" });
      res.status(200).json({ data: users });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};