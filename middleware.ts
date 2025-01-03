import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/client"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const authObject = await auth(); // Await the auth call

    
    if (!authObject.userId) {
      // Redirect to sign-in page or handle unauthenticated access
      return authObject.redirectToSignIn(); // Use redirectToSignIn instead of protect()
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/",],
};