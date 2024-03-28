import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/dist/types/server'
import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    return withAuth(request)
}


export const config = {
    matcher: ['/resume/:path*', '/track/:path*',  '/upload/resume', '/upload'],
}
