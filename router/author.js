import express from "express";
import { authorReg, authorUpdate, getAllAuthor, getauthorById } from "../controller/author.js";

const router = express.Router();

router.post("/register",authorReg)
router.put("/update",authorUpdate)
router.get("/getbyid",getauthorById)
router.get("/getall",getAllAuthor)


export default router;