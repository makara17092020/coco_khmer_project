/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "admin@example.com" &&
          credentials?.password === "admin123"
        ) {
          // id must be a string, not number
          const user: User & { isAdmin: boolean } = {
            id: "1", // <-- string here
            name: "Admin",
            email: "admin@example.com",
            isAdmin: true,
          };
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = (user as any).isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.isAdmin) {
        (session.user as any).isAdmin = true;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
