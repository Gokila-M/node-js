import express from "express";
import { bookReg } from "../controller/book.js";


const router = express.Router();

router.post("/register",bookReg)


export default router;