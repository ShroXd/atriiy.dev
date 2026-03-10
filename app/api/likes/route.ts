import { type NextRequest, NextResponse } from 'next/server'

const WORKER_URL = 'https://atriiy-blog-api.shroxdf.workers.dev'

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get('postId')
  if (!postId) return NextResponse.json({ error: 'Missing postId' }, { status: 400 })

  const res = await fetch(`${WORKER_URL}/likes?postId=${encodeURIComponent(postId)}`, {
    headers: {
      'x-forwarded-for': req.headers.get('x-forwarded-for') ?? '',
      'user-agent': req.headers.get('user-agent') ?? '',
    },
  })
  const data = await res.json()
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get('postId')
  if (!postId) return NextResponse.json({ error: 'Missing postId' }, { status: 400 })

  const res = await fetch(`${WORKER_URL}/likes?postId=${encodeURIComponent(postId)}`, {
    method: 'POST',
    headers: {
      'x-forwarded-for': req.headers.get('x-forwarded-for') ?? '',
      'user-agent': req.headers.get('user-agent') ?? '',
    },
  })
  const data = await res.json()
  return NextResponse.json(data)
}
