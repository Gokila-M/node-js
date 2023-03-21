

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
      let register = new Book({       
        bookName: bookName,       
        bookType: bookType,
        bookCode: bookCode,
        stock: stock,
        authorId:authorId      
      });
      try {
        let Author = await register.save();
        res.status(201).json({ message:"Register Sucessfully"});
      } catch (error) {
        res.status(400).json({ message:error.message });
      }
    
  };