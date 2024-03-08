import { NextRequest, NextResponse } from 'next/server'
 
export const middleware = (request: NextRequest) => {
    const path = request.nextUrl.pathname
    // console.log("routes coming in middleware", path);
    const isPublicPath = path === '/login' || path==='/'
    const isPrivatePath = path === '/dashboard' || path==='/about' || path==='/patient' || path==='/product'
    
    const auth = request.cookies.get('auth')?.value || ''
    console.log(auth)
 
    if (isPublicPath && auth) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }
 
    if (isPrivatePath && !auth) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}