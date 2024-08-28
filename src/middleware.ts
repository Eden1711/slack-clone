import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isSignInPage = createRouteMatcher(["/auth"]);
// const isProtectedRoute = createRouteMatcher(["/product(.*)"]);

export default convexAuthNextjsMiddleware((request) => {
  if (!isSignInPage(request) && !isAuthenticatedNextjs()) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  if (isSignInPage(request) && isAuthenticatedNextjs()) {
    return nextjsMiddlewareRedirect(request, "/");
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
