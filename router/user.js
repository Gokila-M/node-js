import express from "express";
import { getAllUser, getuserById, login, otpGenrate, userReg, userUpdate} from "../controller/user.js";
const router = express.Router();

router.post("/register",userReg)
router.post("/login",login)
router.post("/otpGenerate",otpGenrate)
router.put("/update",userUpdate)
router.get("/getbyid/:id",getuserById)
router.get("/getalluser",getAllUser)

export default router;