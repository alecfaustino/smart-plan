import { Priority } from "@/app/generated/prisma/wasm";
import prisma from "@/lib/prisma";

// Create Task
export async function createTask(title: string, 
  userId: string, dueDate?: Date, description?: string, priority?: Priority) {
  return await prisma.task.create({
    data: {
      title,
      userId,
      // optional fields
      ...(description && { description }),
      ...(dueDate && { dueDate }),
      ...(priority && { priority }),
    },
  });
}

// Get All Tasks for a User
export async function getTasksByUser(userId: string) {
  return await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

// Get Task by ID
export async function getTaskById(id: string) {
  return await prisma.task.findUnique({
    where: { id },
  });
}

// Update Task
export async function updateTask(id: string, title: string, description?: string, dueDate?: Date, priority?: Priority) {
  return await prisma.task.update({
    where: { id },
    data: {
      title,
      ...(description && { description }),
      ...(dueDate && { dueDate }),
      ...(priority && { priority }),
    },
  });
}

// Delete Task
export async function deleteTask(id: string) {
  return await prisma.task.delete({
    where: { id },
  });
}

// Mark Task as Completed
export async function markTaskAsCompleted(id: string) {
  return await prisma.task.update({
    where: { id },
    data: { isCompleted: true },
  });
}

// Mark Task as Incomplete
export async function markTaskAsIncomplete(id: string) {
  return await prisma.task.update({
    where: { id },
    data: { isCompleted: false },
  });
}