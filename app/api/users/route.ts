// api logic for all users routes

import { createUser, getUsers } from "@/db/users";
import { NextResponse, NextRequest } from "next/server";
import { hash }from "bcryptjs";


// get all users
export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users);
}

// create a new user
// TODO use bcrypt to hash password before saving
export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();
  const passwordHash = await hash(password, 10);
  const newUser = await createUser(name, email, passwordHash);
  return NextResponse.json(newUser);
}

