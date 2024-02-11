import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId; // Correct the field name to "userId"
    next();
  } catch (error) {
    console.error("Token verification error:", error); // Log token verification errors
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default verifyToken;
