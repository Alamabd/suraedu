import jwt, { SignOptions } from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

export function createToken(payload: object) {
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES as jwt.SignOptions["expiresIn"],
  };

  return jwt.sign(
    payload,
    secret,
    options
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret);
}