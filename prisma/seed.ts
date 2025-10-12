import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alec",
    email: "alec@test.com",
    passwordHash: "password123",
    tasks: {
      create: [
        { title: "Wash the dishes",
          description: "Use the new sponge I bought last week",
        }
      ]
    }

  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    passwordHash: "securepassword",
    tasks: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          description: "Stay updated with the latest news",
        },
      ],
    },
  },
  {
    name: "Bob2",
    email: "bob2@prisma.io",
    passwordHash: "securepassword2",
    tasks: {
      create: [
        {
          title: "Complete the project report",
          description: "Finish the report by EOD",
        },
      ],
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.upsert({ where: { email: u.email }, update: {}, create: u });
  }
}

main();