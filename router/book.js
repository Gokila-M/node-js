import express from "express";
import { bookCreate, bookUpdate, getAllbook, getbookById } from "../controller/book.js";


const router = express.Router();

router.post("/create",bookCreate)
router.put("/update",bookUpdate)
router.get("/getbyid",getbookById)
router.get("/getall",getAllbook)

export default router;