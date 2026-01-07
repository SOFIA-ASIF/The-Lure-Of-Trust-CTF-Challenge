import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "a_super_secret_key_for_my_ctf";

export async function POST(req: Request) {
  try {
    const auth = req.headers.get("authorization");

    console.log("RAW AUTH:", auth);

    if (!auth) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }

    const token = auth.split(" ")[1];
    console.log("TOKEN:", token);
    console.log("DECODED:", jwt.decode(token));

    const payload = jwt.decode(token);

    if (!payload || typeof payload !== "object") {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 }
      );
    }

    const newToken = jwt.sign(payload, SECRET, {
      algorithm: "HS256",
      expiresIn: "1h",
    });

    return NextResponse.json({ token: newToken });
  } catch (err) {
    console.error("ERROR:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

