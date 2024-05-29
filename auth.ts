import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./utils/auth-queries";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  /*  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  }, */
  callbacks: {
    async signIn({ user, profile, account, credentials }) {
      /*  if(user.id) {  logica para loguear solo usuarios con email verificado - para usarlo falta que al loguear con google se verifique el campo automaticamente
          const existingUser = await getUserById(user.id)

          if(!existingUser || !existingUser?.emailVerified) {
            return false
          }
        } */
      console.log("signIn", user);
      return true;
    },

    async jwt({ token, user }) {
      if (!token.sub) return token;
      console.log("JWT user ", user);
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token, user }) {
      session.user.id = token.id as string;
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  ...authConfig,
});
