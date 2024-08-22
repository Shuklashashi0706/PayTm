import bankModal from "../models/bankModal";
import { Request, Response } from "express";
import mongoose from "mongoose";

//make this enum to be put in constant file
enum ResponseStatus {
  "success" = 200,
  "not_found" = 404,
  "server_fail" = 500,
}

export const getBalance = async (req: Request, res: Response) => {
  const id: string | null = req.query.userId as string;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(ResponseStatus.server_fail)
      .json({ message: "Invalid userId" });
  }

  try {
    const balance = await bankModal
      .findOne({ userId: new mongoose.Types.ObjectId(id) })
      .select("-userId");

    if (balance) {
      res
        .status(ResponseStatus.success)
        .json({ message: "Successful", balance: balance });
    } else {
      res.status(ResponseStatus.not_found).json({ message: "Unsuccessful" });
    }
  } catch (error) {
    console.error("Error", error);
    res.status(ResponseStatus.server_fail).json({ message: "Error" });
  }
};

export const transferBalance = async (req: Request, res: Response) => {
  try {
    
    const recieverId: string | undefined = req.query.id as string | undefined;
    const { senderId, amount }: { senderId: string; amount: number } = req.body;
    console.log("Sender",senderId,"Reciever",recieverId);
    
    if (!senderId || !recieverId || !amount) {
      return res.status(400).json({
        message: "Missing senderId, recieverId, or amount",
      });
    }
    if (
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !mongoose.Types.ObjectId.isValid(recieverId)
    ) {
      return res.status(400).json({
        message: "Invalid senderId or recieverId",
      });
    }

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const account = await bankModal
        .findOne({ userId: new mongoose.Types.ObjectId(senderId) })
        .session(session);

      if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
          message: "Insufficient balance",
        });
      }

      const toAccount = await bankModal
        .findOne({ userId: new mongoose.Types.ObjectId(recieverId) })
        .session(session);

      if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
          message: "Invalid account",
        });
      }

      // Perform the transfer
      await bankModal
        .updateOne(
          { userId: new mongoose.Types.ObjectId(senderId) },
          { $inc: { balance: -amount } }
        )
        .session(session);

      await bankModal
        .updateOne(
          { userId: new mongoose.Types.ObjectId(recieverId) },
          { $inc: { balance: amount } }
        )
        .session(session);

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      res.json({
        message: "Transfer successful",
      });
    } catch (error) {
      console.error("Error", error);
      await session.abortTransaction();
      session.endSession();
      res
        .status(ResponseStatus.server_fail)
        .json({ message: "Error occurred during the transaction" });
    }
  } catch (error) {
    console.error(error);
  }
};
