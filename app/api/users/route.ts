// api logic for all users routes


import { createUser, getUsers } from "@/db/users";
import { NextResponse, NextRequest } from "next/server";

// get all users
export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users);
}

// create a new user
export async function POST(request: NextRequest) {
  const { name, email } = await request.json();
  const newUser = await createUser(name, email);
  return NextResponse.json(newUser);
}

