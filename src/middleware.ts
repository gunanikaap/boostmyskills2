import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCourseByLegacyId } from "@/data/courses-catalogue";

// Redirect legacy Open edX course URLs (which contain a colon that Next's dynamic
// segments cannot route) to the clean local detail page. e.g.
//   /courses/course-v1:Artemat+MC10_RES4CITY+2025_T01/about  ->  /courses/serious-game
export function middleware(request: NextRequest) {
  const pathname = decodeURIComponent(request.nextUrl.pathname);
  const match = pathname.match(/^\/courses\/(course-v1:[^/]+?)(?:\/about)?\/?$/);
  if (match) {
    const course = getCourseByLegacyId(match[1]);
    if (course) {
      return NextResponse.redirect(new URL(`/courses/${course.slug}`, request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/courses/:path*"]
};
