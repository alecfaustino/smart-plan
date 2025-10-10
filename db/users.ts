import prisma from '@/lib/prisma'

// Create User
export async function createUser(name: string, email: string) {
  return await prisma.users.create({
    data: {
      name,
      email,
    },
  })
}