import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UsersCreateInput[] = [
  {
    name: "Alec",
    email: "alec@test.com",
    Tasks: {
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
    Tasks: {
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
    Tasks: {
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
    await prisma.users.upsert({ where: { email: u.email }, update: {}, create: u });
  }
}

main();