import express, { Request, Response } from "express";
import dotenv from "dotenv";
import dbConnection from "./data/dbConnection";
import userRouter from "./routes/user";
import accountRouter from "./routes/account"
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({ path: "./.env" });
const app = express();
const PORT = process.env.PORT;

//database connection
dbConnection();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:'http://localhost:3000', // Replace with your frontend origin
  credentials: true, // This allows the cookie to be sent
}));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account",accountRouter)
app.get("/", (req: Request, res: Response) => {
  res.send("Hi");
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
