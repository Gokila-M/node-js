import { captialFirstLetter } from "../config/capitalLetter.js";
import Author from "../models/author.js";

export const authorReg = async (req, res) => {    
    let email = req.body.email;
    let mobileNo= req.body.mobileNo;
    let authorName = captialFirstLetter(req.body.authorName);    
      let register = new Author({       
        email: email,       
        authorName: authorName,
        dob: req.body.dob,
        gender: req.body.gender?.toLowerCase(),
        bloodGroup: req.body.bloodGroup,       
        mobileNo: mobileNo,
       
      });
      try {
        let Author = await register.save();
        res.status(201).json({ message:"Register Sucessfully"});
      } catch (error) {
        res.status(400).json({ message:error.message });
      }
    
  };