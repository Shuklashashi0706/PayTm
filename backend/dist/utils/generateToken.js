"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtToken = () => {
    let salt = process.env.JWT_SECRET;
    return {
        generateToken(data) {
            const hash = jsonwebtoken_1.default.sign(data, salt);
            return hash;
        },
        verifyToken(req, res, next) {
            const { token } = req.cookies;
            if (token) {
                let verified = jsonwebtoken_1.default.verify(token, salt);
                if (verified) {
                    next();
                }
                else {
                    return res.status(400).json({ message: "User not verified" });
                }
            }
            else {
                return res.status(400).json({ message: "User not verified" });
            }
        },
    };
};
exports.default = jwtToken;
