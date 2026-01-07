import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "a_super_secret_key_for_my_ctf";

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

    // ❌ INTENTIONAL LOGIC FLAW (CTF)
    // Token is decoded but NOT verified
    const payload = jwt.decode(token);

    if (!payload || typeof payload !== "object") {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 }
      );
    }

    // ❌ Re-signing attacker-controlled claims
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
