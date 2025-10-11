import { NextRequest, NextResponse } from "next/server";
import { getUserById, updateUser, deleteUser} from "@/db/users";

//  test with ID: c5a43608-7b82-445f-934a-4b5636e2e3b3
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // keep await here as per https://nextjs.org/docs/messages/sync-dynamic-apis
  const { id } = await params;
  const user = await getUserById(id);
  if (user) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  const { name, email } = await request.json();

  const updatedUser = await updateUser(id, name, email)

  return NextResponse.json(updatedUser);
}

// do not test with ID: c5a43608-7b82-445f-934a-4b5636e2e3b3
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  const deletedUser = await deleteUser(id);
  return NextResponse.json(deletedUser)
}
