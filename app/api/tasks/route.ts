import { getTasksByUser, createTask } from "@/db/tasks";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse} from "next/server";
import { requireAuth } from "@/lib/helpers/auth";

// all tasks for a user
export async function GET() {
  const response = await requireAuth();
  // Check if the response is a string (as expected) or a NextResponse (error case)
  if (response instanceof NextResponse) return response;
  const userId = response as string;
  console.log("@@@@@@", userId);
  const tasks = await getTasksByUser(userId);
  return NextResponse.json(tasks);
}
// create a new task
export async function POST(request: NextRequest) {
  const response = await requireAuth();
  if (response instanceof NextResponse) return response;
  const userId = response as string;
  const { title, description, dueDate, priority } = await request.json();
  const newTask = await createTask(title, userId, 
     dueDate ? dueDate : undefined, description ? description : undefined, 
     priority ? priority : undefined);
  return NextResponse.json(newTask);
}