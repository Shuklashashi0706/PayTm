import userModal from "../models/userModal";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwtToken from "../utils/generateToken";
import bankModal from "../models/bankModal";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phoneNum } = req.body;
    if (!name || !email || !password || !phoneNum) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const foundUser = await userModal.findOne({ email: email });
    if (foundUser) {
      return res.status(400).send({ message: "User already registered" });
    }
    let salt = 10;
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = {
      name: name,
      email: email,
      password: hashedPassword,
      phone: phoneNum,
    };
    const newUser = await userModal.create(user);
    const balance = {
      userId: newUser._id,
      balance: Math.floor(Math.random() * 10000 + 1),
    };
    await bankModal.create(balance);
    return res
      .status(200)
      .cookie("token", jwtToken().generateToken(user), { httpOnly: true })
      .send({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email: emails, password: passwords } = req.body;
    if (!emails || !passwords) {
      res.status(400).send({ message: "All fields are required" });
    }
    const user = await userModal.findOne({ email: emails });
    const users = {
      name: user?.name,
      email: user?.email,
    };
    const aggregate = [
      {
        $match: {
          email:`${emails}`,
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
    const userRes = await userModal.aggregate(aggregate); 
    if (user) {
      const password = user.password;
      const isSame = bcrypt.compareSync(passwords, password);
      if (isSame) {
        res
          .status(200)
          .cookie("token", jwtToken().generateToken(users), { httpOnly: true })
          .send({ message: "User login successfully", userRes });
      } else {
        res.status(400).send({ message: "User not login successfully" });
      }
    } else {
      res.status(400).send({ message: "User not registered" });
    }
  } catch (error) {
    res.status(500).send({ error: error });
    console.error(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    const user = await userModal.findOne({ email: email });
    if (user) {
      const resp = await userModal.updateOne(
        { email: email },
        { name: name, password: password }
      );
      if (resp) {
        res.status(200).send({ message: "Updated successfully" });
      }
    }
  } catch (error) {
    res.status(500).send("Error");
    console.error(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModal.find({}).select("-password");
    if (users) {
      res
        .status(200)
        .send({ message: `${users.length} users found`, users: users });
    } else {
      res.status(200).send({ message: "No users found" });
    }
  } catch (error) {
    res.status(500).send("Error");
    console.error(error);
  }
};

export const searchUser = async (req: Request, res: Response) => {
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
    const resp = await userModal.aggregate(aggregate);
    if (resp) {
      res.status(200).send({ message: "Done", names: resp });
    }
  } catch (error) {
    console.error(error);
  }
};

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
