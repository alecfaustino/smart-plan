// lib/middleware/auth.ts
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  console.log("Session in requireAuth:", session);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO REMOVE THE STRING FALLBACK AFTER TESTING
  const id = session.user.id
  return id;
}
