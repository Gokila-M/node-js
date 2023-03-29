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
  export const authorUpdate = async (req, res) => {
    let  id  = req.query.id;
    const exauthor = await Author.findOne({_id:id});
    try {
      if (!id) {
        return res.status(400).json({ message: "Please Provide A Id In Query" });
      }
      if (!exauthor) {
        return res.status(400).json({ message: "Author Not Found" });
      }   
      await Author.findByIdAndUpdate({ _id: id },{$set: req.body},{ new: true });
      return res.status(200).json({ message: "Author Data Updated Successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  export const getAllAuthor = async (req, res) => {
    try {
       const author = await Author.find({})
       return res.status(200).json({ data:author });
     } catch (error) {
       return res.status(500).json({ message: error.message });
     }
  };
 export const getauthorById = async (req, res) => {
     let id = req.query.id
     try {
       const author = await Author.findById({ _id:id });
       if (!author) return res.status(404).json({ message: "Author Not Found" });
       res.status(200).json({ data: author });
     } catch (error) {
       res.status(400).json({ message: error.message });
     }
 };