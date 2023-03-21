import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import dotenv from "dotenv"
import user from "./router/user.js"
import book from "./router/book.js"
import author from "./router/author.js"
import mapping from "./router/mapping.js"

dotenv.config()
const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const port = process.env.PORT || 8000

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/nodejs')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB... '+err.message));

app.get("/",(req,res)=>{
    res.send("Welcome to HRMS V-2")
})
app.use("/api/user",user)
app.use("/api/book",book)
app.use("/api/author",author)
app.use("/api/mapping",mapping)

app.listen(port,()=>{
    console.log("Server connected to "+ port);    
})