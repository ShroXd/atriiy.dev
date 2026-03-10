'use client'

import { useEffect, useState } from 'react'

interface LikeButtonProps {
  postId: string
}

interface LikeState {
  likes: number
  liked: boolean
}

const API_URL = '/api'

export default function LikeButton({ postId }: LikeButtonProps) {
  const [state, setState] = useState<LikeState | null>(null)
  const [loading, setLoading] = useState(true)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/likes?postId=${encodeURIComponent(postId)}`)
      .then(r => r.json())
      .then((data: LikeState) => setState(data))
      .catch(() => setState({ likes: 0, liked: false }))
      .finally(() => setLoading(false))
  }, [postId])

  async function handleLike() {
    if (!state || state.liked || pending) return

    // Optimistic update
    setState(prev => prev ? { likes: prev.likes + 1, liked: true } : prev)
    setPending(true)

    try {
      const res = await fetch(
        `${API_URL}/likes?postId=${encodeURIComponent(postId)}`,
        { method: 'POST' }
      )
      if (!res.ok) throw new Error('Failed')
      const data: LikeState = await res.json()
      setState(data)
    } catch {
      // Roll back
      setState(prev => prev ? { likes: prev.likes - 1, liked: false } : prev)
    } finally {
      setPending(false)
    }
  }

  if (loading) {
    return (
      <div className='flex items-center gap-2'>
        <div
          className='h-8 w-20 animate-pulse rounded-full'
          style={{ backgroundColor: 'var(--color-surface)' }}
        />
      </div>
    )
  }

  const liked = state?.liked ?? false
  const likes = state?.likes ?? 0

  return (
    <button
      onClick={handleLike}
      disabled={liked || pending}
      aria-label={liked ? `${likes} likes` : 'Like this post'}
      className='group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200'
      style={{
        backgroundColor: liked
          ? 'var(--color-accent-soft)'
          : 'var(--color-surface)',
        border: `1px solid ${liked ? 'var(--color-accent-soft-border)' : 'var(--color-surface-border)'}`,
        color: liked ? 'var(--color-accent)' : 'var(--color-subtle)',
        cursor: liked ? 'default' : 'pointer',
      }}
    >
      <HeartIcon filled={liked} />
      <span>{likes}</span>
    </button>
  )
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill={filled ? 'currentColor' : 'none'}
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
    </svg>
  )
}
