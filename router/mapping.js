import express from "express";
import {bookuserMapping, getAllmappings, getmappingById, mappingUpdate} from "../controller/mapping.js";


const router = express.Router();

router.post("/create",bookuserMapping)
router.put("/update",mappingUpdate)
router.get("/getbyid",getmappingById)
router.get("/getall",getAllmappings)


export default router;