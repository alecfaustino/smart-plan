import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("Session:", session);
  if (!session) {
    return (
      <>
        <h1>You are not logged in</h1>
        <h2>Please log in to view your tasks</h2>
      </>
    );
  }

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users/${session.user.id}`,
    { cache: "no-store" }
  );
  const user = await res.json();

  console.log(user);
  return (
    <>
      <h1>This is a temporary Page</h1>
      <h2>List of tasks of this user: {user.name}</h2>
    </>
  );
}
