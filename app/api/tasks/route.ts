import { getTasksByUser, createTask } from "@/db/tasks";
import { NextRequest, NextResponse} from "next/server";

// all tasks for a user

export async function GET() {
  // **** BIG TODO *** //
  // *** IF THIS USER IS CHANGED, CHANGE THIS ID *** //
  const id = "c5a43608-7b82-445f-934a-4b5636e2e3b3" // example id until auth is implemented // 
  const tasks = await getTasksByUser(id);
  return NextResponse.json(tasks);
}

// TODO: Revisit this route if implementing task creation by an admin/managing user's tasks
// Maybe add a /api/user/[id]/tasks route instead
// Example user id for postman: c5a43608-7b82-445f-934a-4b5636e2e3b3
export async function POST(request: NextRequest) {
  const id = "c5a43608-7b82-445f-934a-4b5636e2e3b3"; // example id until auth is implemented
  const { title, description, dueDate, priority } = await request.json();
  const newTask = await createTask(title, id, 
     dueDate ? dueDate : undefined, description ? description : undefined, 
     priority ? priority : undefined);
  return NextResponse.json(newTask);
}