"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_1 = require("../controllers/account");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const router = express_1.default.Router();
router.get("/getBalance", (0, generateToken_1.default)().verifyToken, account_1.getBalance);
router.post("/transfer", (0, generateToken_1.default)().verifyToken, account_1.transferBalance);
exports.default = router;
