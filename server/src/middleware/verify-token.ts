import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.cookies["auth_token"];

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    req.userId = (decoded as JwtPayload).userId;

    next();
  } catch (error) {
    res.cookie("auth_token", "", { expires: new Date(0) });
    return res.status(401).json({ message: "unauthorized" });
  }
};

export default verifyToken;
