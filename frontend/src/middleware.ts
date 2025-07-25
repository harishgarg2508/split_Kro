import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (token) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/login', request.nextUrl));
}

export const config = {
  matcher: ['/dashboard', '/userprofile'],
};
