import express from "express";
import { authorReg } from "../controller/author.js";

const router = express.Router();

router.post("/register",authorReg)


export default router;