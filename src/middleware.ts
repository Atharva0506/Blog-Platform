
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublic =  path === '/sign-up'

  const token = request.cookies.get('Token')?.value || ''

  if(isPublic && token) {
    return NextResponse.redirect(new URL('/',request.nextUrl))
  }
  if(!isPublic && !token) {
    return NextResponse.redirect(new URL('/sign-up',request.nextUrl))
  }

}
 
export const config = {
  matcher: [
    '/',
    '/sign-up',
    '/profile',
    '/profile/:path*',
]
}