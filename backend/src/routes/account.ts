import express from "express"
import { getBalance,transferBalance } from "../controllers/account";
import jwtToken from "../utils/generateToken";
const router = express.Router();

router.get("/getBalance",jwtToken().verifyToken,getBalance)
router.post("/transfer",jwtToken().verifyToken,transferBalance)

export default router;