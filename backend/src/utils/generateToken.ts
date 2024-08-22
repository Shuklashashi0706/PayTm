import jwt,{Secret} from "jsonwebtoken";
import {Request,Response,NextFunction} from "express"

export interface userInterface{
    name?: string,
    email?: string,
    password?: string,
    phone?: number,
}

const jwtToken = () => {
  let salt:Secret = process.env.JWT_SECRET;
  return {
    generateToken(data:userInterface) {
      const hash = jwt.sign(data, salt);
      return hash;
    },
    verifyToken(req:Request, res:Response, next:NextFunction) {
      const { token } = req.cookies;
      if (token) {
        let verified = jwt.verify(token, salt);
        if (verified) {
          next();
        } else {
          res.status(400).send({ message: "User not verified" });
        }
      } else {
        res.status(400).send({ message: "User not verified" });
      }
    },
  };
};

export default jwtToken;
