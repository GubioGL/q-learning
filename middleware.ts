import { clerkMiddleware } from '@clerk/nextjs/server';

// Sign-in is optional for now (anonymous progress, see db/progress.ts). To require it, use
// createRouteMatcher(['/cursos(.*)', '/desafios(.*)', '/metas(.*)']) and auth.protect().
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    "/"
  ],
};
