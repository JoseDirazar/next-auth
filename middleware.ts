import NextAuth from "next-auth";

import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  SIGN_IN_PAGE,
  adminRoutes,
  authRoutes,
  privateRoutes,
} from "./middleware-routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  //const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }
  if (!isLoggedIn && isPrivateRoute) {
    return Response.redirect(new URL(SIGN_IN_PAGE, nextUrl));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
