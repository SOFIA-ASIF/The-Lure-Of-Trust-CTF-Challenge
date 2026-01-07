import { NextResponse } from "next/server";
import { verify } from "@/lib/jwt";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = auth.split(" ")[1];
  const payload = verify(token);

  return NextResponse.json(payload);
}
