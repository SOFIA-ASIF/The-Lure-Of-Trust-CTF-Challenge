import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev_secret";

export async function POST(req: Request) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth) {
      return NextResponse.json(
        { error: "Missing token" },
        { status: 401 }
      );
    }

    const token = auth.split(" ")[1];

    // ❌ This WILL throw for modified tokens
    const payload = jwt.verify(token, SECRET);

    // ❌ LOGIC FLAW (INTENTIONAL FOR CTF)
    const newToken = jwt.sign(payload, SECRET, {
      algorithm: "HS256",
      expiresIn: "1h",
    });

    return NextResponse.json({ token: newToken });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }
}
