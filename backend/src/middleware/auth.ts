import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
interface JwtPayload {
  useerId: string;
  iat: number;
  exp: number;
}


const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).useerId; // Correctly access userId
    next();
  } catch (error) {
    console.error("Token verification error:", error); // Log token verification errors
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default verifyToken;
