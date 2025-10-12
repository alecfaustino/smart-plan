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

        
        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ]
})

export { handler as GET, handler as POST };