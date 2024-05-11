import createMiddleware from "next-intl/middleware";
import { locales } from "./language_navigation";
import { NextRequest, NextResponse } from "next/server";
export default createMiddleware({
  locales,
  defaultLocale: "vi",
  localePrefix: "never",
});

// export async function middleware(request: NextRequest) 
// {
//   // console.log(request.nextUrl)
//   // return NextResponse.next()
// }

export const config = {
  matcher: ["/((?!api|_next|(?:[.-]*)\\..*).*)"],
};
