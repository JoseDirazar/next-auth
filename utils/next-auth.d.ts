import { DefaultSession } from "next-auth";

import { ROLETYPE } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  role: ROLETYPE;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: ROLETYPE;
  }
}
