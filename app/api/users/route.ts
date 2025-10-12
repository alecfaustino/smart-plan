// api logic for all users routes


import { createUser, getUsers } from "@/db/users";
import { NextResponse, NextRequest } from "next/server";

// get all users
export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users);
}

// create a new user
// TODO use bcrypt to hash password before saving
export async function POST(request: NextRequest) {
  const { name, email, passwordHash } = await request.json();
  const newUser = await createUser(name, email, passwordHash);
  return NextResponse.json(newUser);
}

