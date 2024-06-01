import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./utils/auth-queries";
import { ROLETYPE } from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  /*  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  }, */
  callbacks: {
    async signIn({ user }) {
      if (user.id) {
        const existingUser = await getUserById(user.id);

        if (!existingUser || existingUser.role !== ROLETYPE.ADMIN) {
          return false;
        }
      }

      return true;
    },

    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.id = token.sub;

      return token;
    },
    session({ session, token, newSession, trigger }) {
      if (token.role && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role;
      }
      return session;
    },
  },
  ...authConfig,
});
