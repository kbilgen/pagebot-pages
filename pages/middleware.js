import { NextResponse } from 'next/server'

export function middleware(req) {
  const url = req.nextUrl.clone()

  const hostname = req.headers.get('host')

  if (!hostname) {
    return NextResponse.next()
  }

  // landingmate.site ve www hariç
  const subdomain = hostname
    .replace('.landingmate.site', '')
    .replace('www.', '')

  // ana domain ise devam et
  if (
    subdomain === 'landingmate.site' ||
    subdomain === 'landingmate'
  ) {
    return NextResponse.next()
  }

  // slug → html mapping
  const routes = {
    Denizyuzmeokullari: '/pages/p_905465655980_1779132391078.html',
  }

  const rewritePath = routes[subdomain]

  if (rewritePath) {
    url.pathname = rewritePath
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}