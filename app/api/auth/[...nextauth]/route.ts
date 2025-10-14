import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUsers } from "@/db/users";
import { compare } from "bcryptjs";
import { JWT } from "next-auth/jwt";

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
        if (user && credentials?.password) {
          const isValid = await compare(credentials?.password, user?.passwordHash);
          if (isValid) {
            return { id: user.id, name: user.name, email: user.email };
          }
        }

        return null;

      }
    })
  ],
  
  // TO DO: add pages for custom sign in page
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST };