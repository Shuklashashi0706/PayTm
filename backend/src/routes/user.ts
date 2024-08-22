import express from "express";
import { register, login, updateUser, getAllUsers,searchUser } from "../controllers/user";
import jwtToken from "../utils/generateToken";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/updateUser", jwtToken().verifyToken, updateUser);
router.get("/getAllUsers", jwtToken().verifyToken, getAllUsers);
router.get("/searchUser",jwtToken().verifyToken,searchUser)

// router.get("/getUser",jwtToken().verifyToken,getUser)

// router.get("/deleteUser",jwtToken().verifyToken,deleteUser)
// router.get("/deleteAllUsers",jwtToken().verifyToken,deleteAllUser)

export default router;
