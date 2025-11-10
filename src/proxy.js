import { NextResponse } from "next/server";
import { auth } from "./auth";

export async function proxy(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    const session = await auth();
    const isLoggedIn = !!session?.user;

    const protectedRoutes = ["/onbording", "/chat"];
    const authRoutes = ["/signin", "/signup"];

    const isProtected = protectedRoutes.some((route) =>
        pathname === route || pathname.startsWith(`${route}/`)
    );
    const isAuthPage = authRoutes.includes(pathname);

    if (!isLoggedIn && isProtected) {
        const signInUrl = new URL("/signin", req.url);
        signInUrl.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(signInUrl);
    }

    if (isLoggedIn && isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/signin", "/signup", "/chat/:path*", "/onbording"],
};
