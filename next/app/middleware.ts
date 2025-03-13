import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    if (url.pathname === '/') {
      url.pathname = '/Home';
      return NextResponse.redirect(url);
    }
    if (!['/Home', '/Next'].includes(url.pathname)) {
      url.pathname = '/Home';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }
  