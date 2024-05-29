/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/blog",
  "/community",
  "/contact",
  "/services",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/sign-in", "/sign-up"];

export const privateRoutes = ["/error", "/reset", "/new-password", "/about"];

export const adminRoutes = ["/dashboard"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";

/**
 * redirect to sing-in page
 * @type {string}
 */
export const SIGN_IN_PAGE = "/sign-in";
