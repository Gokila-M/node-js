

import Author from "../models/author.js";
import Book from "../models/book.js";

export const bookReg = async (req, res) => {   
    let bookName = req.body.bookName;
    let bookType = req.body.bookType; 
    let bookCode = req.body.bookCode; 
    let stock  = req.body.stock;
    let authorId= req.query.authorId
    if(!authorId) return res.status(400).json({ message: "provide author id in query" });
    let exbookName = await Book.findOne({ bookName:bookName });
    if (exbookName) return res.status(400).json({ message: "Book Already Exists" });
    let exbookCode = await Book.findOne({ bookCode:bookCode });    
    if (exbookCode) return res.status(400).json({ message: "Book No already exists" });  
    let author= await Author.findOne({ _id:authorId});    
    if (!author) return res.status(400).json({ message: "Author Not Found ...!" });    
    try {
      let register = new Book({       
        bookName: bookName,       
        bookType: bookType,
        bookCode: bookCode,
        stock: stock,
        authorId:authorId      
      });
        let Author = await register.save();
        res.status(201).json({ message:"Register Sucessfully"});
      } catch (error) {
        res.status(400).json({ message:error.message });
      }
    
  };
  export const bookUpdate = async (req, res) => {
    let  id  = req.query.id;
    const exbook = await Book.findOne({_id:id});
    try {
      if (!id) {
        return res.status(400).json({ message: "Please Provide A Id In Query" });
      }
      if (!exbook) {
        return res.status(400).json({ message: "Book Not Found" });
      }   
      await Book.findByIdAndUpdate({ _id: id },{$set: req.body},{ new: true });
      return res.status(200).json({ message: "Book Data Updated Successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  export const getAllbook = async (req, res) => {
    try {
       const book = await Book.find({})
       return res.status(200).json({ data:book });
     } catch (error) {
       return res.status(500).json({ message: error.message });
     }
  };
 export const getbookById = async (req, res) => {
     let id = req.params.id
     try {
       const book = await Book.findById({ _id:id });
       if (!book) return res.status(404).json({ message: "Book Not Found" });
       res.status(200).json({ data: book });
     } catch (error) {
       res.status(400).json({ message: error.message });
     }
 };