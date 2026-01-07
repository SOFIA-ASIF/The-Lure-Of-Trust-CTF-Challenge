import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev_secret";

export async function POST() {
  const token = jwt.sign(
    { user: "guest", tier: "free" },
    SECRET,
    { algorithm: "HS256", expiresIn: "1h" }
  );

  return NextResponse.json({ token });
}
