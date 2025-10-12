import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUsers } from "@/db/users";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        //  find user from db
        const users = await getUsers();
        const user = users.find((user) => user.email === credentials?.email && user.passwordHash === credentials.password);

        // TO DO: validation with bcrypt
        
        if (user) {
          // TO DO: Return object to be encoded into JWT
          return user;
        } else {
          return null;
        }

      }

      // TO DO: add pages for custom sign in page
      // TO DO: add session: { strategy: "jwt" } for JWT sessions

      // TO DO: add jwt call back to assign user id to token id
      // TO DO: add session callback to assign token id to session user id
    })
  ]
})

export { handler as GET, handler as POST };