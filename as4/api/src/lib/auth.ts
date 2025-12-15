import jwt, { Secret, SignOptions } from "jsonwebtoken";

export enum Role {
  admin = "admin",
  creator = "creator",
  user = "user",
}

const JWT_SECRET: Secret = process.env.JWT_SECRET || "dev-secret";
const envTtl = process.env.JWT_EXPIRES_IN;
const SIGN_OPTIONS: SignOptions = {
  expiresIn: (envTtl ?? "1h") as SignOptions["expiresIn"],
};

interface TokenPayload {
  sub: string;
  email: string;
  role: Role;
}

export const signAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, JWT_SECRET, SIGN_OPTIONS);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};
