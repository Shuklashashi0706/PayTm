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
exports.transferBalance = exports.getBalance = void 0;
const bankModal_1 = __importDefault(require("../models/bankModal"));
const mongoose_1 = __importDefault(require("mongoose"));
//make this enum to be put in constant file
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["success"] = 200] = "success";
    ResponseStatus[ResponseStatus["not_found"] = 404] = "not_found";
    ResponseStatus[ResponseStatus["server_fail"] = 500] = "server_fail";
})(ResponseStatus || (ResponseStatus = {}));
const getBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.userId;
    if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res
            .status(ResponseStatus.server_fail)
            .json({ message: "Invalid userId" });
    }
    try {
        const balance = yield bankModal_1.default
            .findOne({ userId: new mongoose_1.default.Types.ObjectId(id) })
            .select("-userId");
        if (balance) {
            res
                .status(ResponseStatus.success)
                .json({ message: "Successful", balance: balance });
        }
        else {
            res.status(ResponseStatus.not_found).json({ message: "Unsuccessful" });
        }
    }
    catch (error) {
        console.error("Error", error);
        res.status(ResponseStatus.server_fail).json({ message: "Error" });
    }
});
exports.getBalance = getBalance;
const transferBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recieverId = req.query.id;
        const { senderId, amount } = req.body;
        console.log("Sender", senderId, "Reciever", recieverId);
        if (!senderId || !recieverId || !amount) {
            return res.status(400).json({
                message: "Missing senderId, recieverId, or amount",
            });
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(senderId) ||
            !mongoose_1.default.Types.ObjectId.isValid(recieverId)) {
            return res.status(400).json({
                message: "Invalid senderId or recieverId",
            });
        }
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const account = yield bankModal_1.default
                .findOne({ userId: new mongoose_1.default.Types.ObjectId(senderId) })
                .session(session);
            if (!account || account.balance < amount) {
                yield session.abortTransaction();
                return res.status(400).json({
                    message: "Insufficient balance",
                });
            }
            const toAccount = yield bankModal_1.default
                .findOne({ userId: new mongoose_1.default.Types.ObjectId(recieverId) })
                .session(session);
            if (!toAccount) {
                yield session.abortTransaction();
                return res.status(400).json({
                    message: "Invalid account",
                });
            }
            // Perform the transfer
            yield bankModal_1.default
                .updateOne({ userId: new mongoose_1.default.Types.ObjectId(senderId) }, { $inc: { balance: -amount } })
                .session(session);
            yield bankModal_1.default
                .updateOne({ userId: new mongoose_1.default.Types.ObjectId(recieverId) }, { $inc: { balance: amount } })
                .session(session);
            // Commit the transaction
            yield session.commitTransaction();
            session.endSession();
            res.json({
                message: "Transfer successful",
            });
        }
        catch (error) {
            console.error("Error", error);
            yield session.abortTransaction();
            session.endSession();
            res
                .status(ResponseStatus.server_fail)
                .json({ message: "Error occurred during the transaction" });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.transferBalance = transferBalance;
