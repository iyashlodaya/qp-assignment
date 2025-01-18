import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface DecodedToken {
  user_id: number;
  role: string; 
  iat?: number;
  exp?: number;
}

const verifyJWT = (req: Request, res: Response, next: NextFunction):void => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    res.status(401).json({ message: "Access token is missing!" });
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY as string;
    const decoded = jwt.verify(token, secretKey) as DecodedToken;

    req.user = decoded;

    next(); 
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};

export default verifyJWT;
