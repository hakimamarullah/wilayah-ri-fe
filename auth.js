import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const providers = [
  Credentials({
    credentials: {
      user: {},
      username: {},
      password: {},
    },
    async authorize(credentials) {
      return JSON.parse(credentials.user);
    },
  }),
];

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
    error: "/auth/signin",
  },
  trustHost: true,
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.accessToken = user.accessToken;
      }

      return token;
    },
  },
});
