import prisma from '@/lib/prisma'

// Create User
export async function createUser(name: string, email: string) {
  return await prisma.user.create({
    data: {
      name,
      email,
    },
  })
}


// Get All Users
export async function getUsers() {
  return await prisma.user.findMany()
}

// Get User by ID
export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id }
  })
}

// Update User
export async function updateUser(id: string, name?: string, email?: string) {
  return await prisma.user.update({
    where: { id },
    data: { name, email },
  })
}

export async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: { id },
  })
}