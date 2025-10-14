import { getTasksByUser, createTask } from "@/db/tasks";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse} from "next/server";

// all tasks for a user

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // TODO: redirect to sign in page if not authenticated
  }
  // TODO REMOVE THE STRING FALLBACK AFTER TESTING
  const id = session.user.id || "c5a43608-7b82-445f-934a-4b5636e2e3b3"; 
  const tasks = await getTasksByUser(id);
  return NextResponse.json(tasks);
}
// create a new task
export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // TODO REMOVE THE STRING FALLBACK AFTER TESTING
  const id = session.user.id || "c5a43608-7b82-445f-934a-4b5636e2e3b3"; 
  const { title, description, dueDate, priority } = await request.json();
  const newTask = await createTask(title, id, 
     dueDate ? dueDate : undefined, description ? description : undefined, 
     priority ? priority : undefined);
  return NextResponse.json(newTask);
}