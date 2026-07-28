import { Request, Response, NextFunction } from "express";
import { auth } from "../services/firebase.service";
import { DecodedIdToken } from "firebase-admin/auth";

declare global {
  namespace Express {
    interface Request {
      firebaseUser?: DecodedIdToken;
    }
  }
}

export async function firebaseAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = authorization.substring(7);

    req.firebaseUser = await auth.verifyIdToken(token);

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}