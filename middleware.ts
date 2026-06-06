import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getRootDomain, getSubdomainFromHost } from "@/lib/domains"

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || ""
  const rootDomain = getRootDomain()

  // Path-based routing when subdomains are not configured
  if (!rootDomain) {
    return NextResponse.next()
  }

  const subdomain = getSubdomainFromHost(host, rootDomain)
  if (!subdomain) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  // Already on the internal published route
  if (pathname.startsWith("/site/")) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  const suffix = pathname === "/" ? "" : pathname
  url.pathname = `/site/${subdomain}${suffix}`

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    /*
     * Run on all paths except:
     * - API routes
     * - Next.js internals
     * - static files (images, fonts, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|eot)$).*)",
  ],
}
