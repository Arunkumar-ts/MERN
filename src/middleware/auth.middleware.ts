import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
  email?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized: Token not provided" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded; 
    next();
  } catch (err) {
    const jwtError = err as jwt.JsonWebTokenError;
    console.error("JWT Error:", jwtError.message);
    res.status(403).json({ error: jwtError.name, message: jwtError.message });
  }
};
