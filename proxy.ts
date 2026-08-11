import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Allow unauthenticated access to /portal only (login page itself)
  // All other /portal/* routes require authentication
  if (request.nextUrl.pathname === "/portal") {
    return response; // Let the page handle its own state
  }

  // Any deeper portal route (/portal/anything) requires auth
  if (request.nextUrl.pathname.startsWith("/portal/")) {
    if (!user) {
      return NextResponse.redirect(new URL("/portal", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: "/portal/:path*",
};