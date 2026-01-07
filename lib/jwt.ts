import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function sign(payload: any) {
  return jwt.sign(payload, SECRET, { algorithm: "HS256", expiresIn: "1h" });
}

export function verify(token: string) {
  return jwt.verify(token, SECRET);
}
