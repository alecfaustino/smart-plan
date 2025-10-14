import { getTaskById } from "@/db/tasks";
import { NextRequest, NextResponse } from "next/server";
import { notFound } from "next/navigation";

// TODO use middleware to get the session and verify user
export async function GET(request: NextRequest, params: { id: string}) {
  const { id } = await params;
  const task = await getTaskById(id);
  if (!task) return notFound();
  return NextResponse.json(task);
};