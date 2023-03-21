import express from "express";
import {bookuserMapping} from "../controller/mapping.js";


const router = express.Router();

router.post("/create",bookuserMapping)


export default router;