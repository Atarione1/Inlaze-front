import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export { default} from "next-auth/middleware"


export const config = {
  matcher:["/project/:path*", "/login/:path*", "/register/:path*",],
  
}

export async function middleware(request: NextRequest) {
  const token = await getToken({  req: request  })

  if (request.nextUrl.pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/project', request.url))
  }
  if (request.nextUrl.pathname.startsWith('/register') && token) {
    return NextResponse.redirect(new URL('/project', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/project') && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}