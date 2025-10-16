import { getTaskById, deleteTask, updateTask } from "@/db/tasks";
import { NextRequest, NextResponse } from "next/server";
import { notFound } from "next/navigation";

// TODO use middleware to get the session and verify user
export async function GET(request: NextRequest, params: { id: string}) {
  const { id } = await params;
  const task = await getTaskById(id);
  if (!task) return notFound();
  return NextResponse.json(task);
};

export async function DELETE(request: NextRequest, params: { id: string}) {
  const { id } = await params;
  const deletedTask = await deleteTask(id);
  return NextResponse.json(deletedTask);
};

export async function PUT(request: NextRequest, params: { id: string}) {
  const { id } = await params;
  const { title, description, dueDate, priority } = await request.json();

  // Validate required field
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  // Parse dueDate if provided
  let parsedDueDate: Date | undefined;
  if (dueDate) {
    parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate.getTime())) {
      return NextResponse.json({ error: "Invalid due date format" }, { status: 400 });
    }
  }

  // Update the task
  const updatedTask = await updateTask(id, title, description, parsedDueDate, priority);
  return NextResponse.json(updatedTask);
}
