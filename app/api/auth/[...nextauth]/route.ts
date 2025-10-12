import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUsers } from "@/db/users";
import { compare } from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) return null;
        //  find user from db
        // TODO: create a getUserByEmail function in db/users.ts
        const users = await getUsers();
        const user = users.find((user) => user.email === credentials?.email);
        // TO DO: validation with bcrypt
        if (user && credentials?.password) {
          const isValid = await compare(credentials?.password, user?.passwordHash);
          if (isValid) {
            return { id: user.id, name: user.name, email: user.email };
          }
        }

        return null;

      }

      // TO DO: add pages for custom sign in page
      // TO DO: add session: { strategy: "jwt" } for JWT sessions

      // TO DO: add jwt call back to assign user id to token id
      // TO DO: add session callback to assign token id to session user id
    })
  ]
})

export { handler as GET, handler as POST };