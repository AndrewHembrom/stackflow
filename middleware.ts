import { clerkMiddleware, createRouteMatcher, auth } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
    "/sign-in",
    "/sign-up",
    "/",
])

export default clerkMiddleware(async (auth, req) => {
    const {userId} = await auth();
    const currentUrl = new URL(req.url)
    const isAccessingDashboard = currentUrl.pathname === "/home"

     // If user is logged in and accessing a public route but not the dashboard
    if(userId && isPublicRoute(req) && !isAccessingDashboard) {
        return NextResponse.redirect(new URL("/home", req.url))
    }
    //not logged in
    if(!userId){
        return NextResponse.redirect(new URL("/sign-in", req.url))
    }
    return NextResponse.next()

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};