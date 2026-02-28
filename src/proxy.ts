import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const adminCookie = request.cookies.get('admin_session')
    const { pathname } = request.nextUrl

    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        if (!adminCookie || adminCookie.value !== process.env.ADMIN_PASSWORD) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    // Security headers
    const response = NextResponse.next()
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

    return response
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/api/:path*',
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
