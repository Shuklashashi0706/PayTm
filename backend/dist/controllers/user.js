"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUser = exports.getAllUsers = exports.updateUser = exports.login = exports.register = void 0;
const userModal_1 = __importDefault(require("../models/userModal"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const bankModal_1 = __importDefault(require("../models/bankModal"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phoneNum } = req.body;
        if (!name || !email || !password || !phoneNum) {
            return res.status(400).send({ message: "All fields are required" });
        }
        const foundUser = yield userModal_1.default.findOne({ email: email });
        if (foundUser) {
            return res.status(400).send({ message: "User already registered" });
        }
        let salt = 10;
        const hashedPassword = bcrypt_1.default.hashSync(password, salt);
        const user = {
            name: name,
            email: email,
            password: hashedPassword,
            phone: phoneNum,
        };
        const newUser = yield userModal_1.default.create(user);
        const balance = {
            userId: newUser._id,
            balance: Math.floor(Math.random() * 10000 + 1),
        };
        yield bankModal_1.default.create(balance);
        return res
            .status(200)
            .cookie("token", (0, generateToken_1.default)().generateToken(user), { httpOnly: true })
            .send({ message: "User registered successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error");
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email: emails, password: passwords } = req.body;
        if (!emails || !passwords) {
            res.status(400).send({ message: "All fields are required" });
        }
        const user = yield userModal_1.default.findOne({ email: emails });
        const users = {
            name: user === null || user === void 0 ? void 0 : user.name,
            email: user === null || user === void 0 ? void 0 : user.email,
        };
        const aggregate = [
            {
                $match: {
                    email: `${emails}`,
                },
            },
            {
                $lookup: {
                    from: "accounts",
                    localField: "_id",
                    foreignField: "userId",
                    as: "result",
                },
            },
            {
                $unwind: {
                    path: "$result",
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    phone: 1,
                    balance: "$result.balance",
                },
            },
        ];
        const userRes = yield userModal_1.default.aggregate(aggregate);
        if (user) {
            const password = user.password;
            const isSame = bcrypt_1.default.compareSync(passwords, password);
            if (isSame) {
                res
                    .status(200)
                    .cookie("token", (0, generateToken_1.default)().generateToken(users), { httpOnly: true })
                    .send({ message: "User login successfully", userRes });
            }
            else {
                res.status(400).send({ message: "User not login successfully" });
            }
        }
        else {
            res.status(400).send({ message: "User not registered" });
        }
    }
    catch (error) {
        res.status(500).send({ error: error });
        console.error(error);
    }
});
exports.login = login;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password } = req.body;
        const user = yield userModal_1.default.findOne({ email: email });
        if (user) {
            const resp = yield userModal_1.default.updateOne({ email: email }, { name: name, password: password });
            if (resp) {
                res.status(200).send({ message: "Updated successfully" });
            }
        }
    }
    catch (error) {
        res.status(500).send("Error");
        console.error(error);
    }
});
exports.updateUser = updateUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModal_1.default.find({}).select("-password");
        if (users) {
            res
                .status(200)
                .send({ message: `${users.length} users found`, users: users });
        }
        else {
            res.status(200).send({ message: "No users found" });
        }
    }
    catch (error) {
        res.status(500).send("Error");
        console.error(error);
    }
});
exports.getAllUsers = getAllUsers;
const searchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const aggregate = [
            {
                $match: { name: { $regex: `${name}`, $options: "i" } },
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    email: 1,
                },
            },
        ];
        const resp = yield userModal_1.default.aggregate(aggregate);
        if (resp) {
            res.status(200).send({ message: "Done", names: resp });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.searchUser = searchUser;
// const getUser = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const user = await userModal.findOne({ email: email }).select("-password");
//     res.status(200).send({ message: "User found ", user: user });
//   } catch (error) {
//     res.status(500).send("Error");
//     console.error(error);
//   }
// };
// const deleteUser = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) {
//       res.status(400).send({ message: "All fields are required" });
//     }
//     const user = await userModal.findOne({ email: email });
//     if (user) {
//       const resp = await userModal.deleteOne({ email: email });
//       if (resp) {
//         res.status(200).send({ message: "User Deleted Successfully" });
//       }
//     } else {
//       res.status(400).send({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).send("Error");
//     console.error(error);
//   }
// };
// const deleteAllUser = async (req, res) => {
//   try {
//     const response = await userModal.deleteMany({});
//     console.log(response);
//     if (response) {
//       res.status(200).send({
//         message: ` ${response?.deletedCount} User Deleted Successfully`,
//       });
//     }
//   } catch (error) {
//     res.status(500).send("Error");
//     console.error(error);
//   }
// };
