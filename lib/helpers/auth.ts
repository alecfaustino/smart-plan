// lib/middleware/auth.ts
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function requireAuth() {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO REMOVE THE STRING FALLBACK AFTER TESTING
  const id = session.user.id || "c5a43608-7b82-445f-934a-4b5636e2e3b3";
  return id;
}
