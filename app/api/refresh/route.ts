import { NextResponse } from "next/server";
import { sign, verify } from "@/lib/jwt";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = auth.split(" ")[1];
  const payload = verify(token);

  // ❌ BUG: blindly re-signs client-controlled payload
  const newToken = sign(payload);

  return NextResponse.json({ token: newToken });
}
