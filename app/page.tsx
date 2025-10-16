import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getUserById } from "@/db/users";
import { getTasksByUser } from "@/db/tasks";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <>
        <h1>You are not logged in</h1>
        <h2>Please log in to view your tasks</h2>
      </>
    );
  }

  const user = await getUserById(session.user.id);
  if (!user) {
    return (
      <>
        <h1>User not found</h1>
      </>
    );
  }

  const tasks = await getTasksByUser(user.id);

  return (
    <>
      <h1>This is a temporary Page!</h1>
      <h2>List of tasks of this user: {user.name}</h2>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.description} (Due:{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
            , Priority: {task.priority})
          </li>
        ))}
      </ul>
    </>
  );
}
