import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(req: NextRequest) {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    try{
        verifyToken(token);
        return NextResponse.next();
    }catch(error){
        return NextResponse.redirect(new URL("/signin", req.url));
    }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile", "/tasks/:path*"],
};