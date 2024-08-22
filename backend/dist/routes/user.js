"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const router = express_1.default.Router();
router.post("/register", user_1.register);
router.post("/login", user_1.login);
router.put("/updateUser", (0, generateToken_1.default)().verifyToken, user_1.updateUser);
router.get("/getAllUsers", (0, generateToken_1.default)().verifyToken, user_1.getAllUsers);
router.get("/searchUser", (0, generateToken_1.default)().verifyToken, user_1.searchUser);
// router.get("/getUser",jwtToken().verifyToken,getUser)
// router.get("/deleteUser",jwtToken().verifyToken,deleteUser)
// router.get("/deleteAllUsers",jwtToken().verifyToken,deleteAllUser)
exports.default = router;
