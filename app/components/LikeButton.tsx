'use client'

import { useEffect, useRef, useState } from 'react'

interface LikeButtonProps {
  postId: string
}

interface LikeState {
  likes: number
  liked: boolean
}

interface Particle {
  id: number
  emoji: string
  px: string
  py: string
}

const EMOJIS = ['❤️', '💖', '✨', '💕', '🩷', '💗']
const API_URL = '/api'
const RAPID_CLICK_THRESHOLD = 3
const RAPID_CLICK_WINDOW = 4000 // ms

let nextId = 0

export default function LikeButton({ postId }: LikeButtonProps) {
  const [state, setState] = useState<LikeState | null>(null)
  const [loading, setLoading] = useState(true)
  const [pending, setPending] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [showShare, setShowShare] = useState(false)
  const [copied, setCopied] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const clickTimestamps = useRef<number[]>([])
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    fetch(`${API_URL}/likes?postId=${encodeURIComponent(postId)}`)
      .then(r => r.json())
      .then((data: LikeState) => setState(data))
      .catch(() => setState({ likes: 0, liked: false }))
      .finally(() => setLoading(false))
  }, [postId])

  useEffect(() => {
    return () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current)
    }
  }, [])

  function trackRapidClicks() {
    const now = Date.now()
    clickTimestamps.current.push(now)
    clickTimestamps.current = clickTimestamps.current.filter(
      t => now - t < RAPID_CLICK_WINDOW
    )
    if (clickTimestamps.current.length >= RAPID_CLICK_THRESHOLD) {
      setShowShare(true)
    }
  }

  async function handleShare() {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ url, title: document.title })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        copiedTimer.current = setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      // user cancelled share dialog
    }
  }

  async function handleLike() {
    if (!state || pending) return

    trackRapidClicks()

    // Restart button animation by forcing a reflow
    const btn = buttonRef.current
    if (btn) {
      btn.style.animation = 'none'
      void btn.offsetHeight
      btn.style.animation = 'like-burst 0.4s ease-out forwards'
    }

    // Spawn a new batch of particles; each batch removes itself independently
    const batch: Particle[] = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * 2 * Math.PI + (Math.random() - 0.5) * 0.8
      const dist = 50 + Math.random() * 40
      return {
        id: nextId++,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        px: `${Math.round(Math.cos(angle) * dist)}px`,
        py: `${Math.round(Math.sin(angle) * dist - 20)}px`,
      }
    })
    const batchIds = new Set(batch.map(p => p.id))
    setParticles(prev => [...prev, ...batch])
    setTimeout(
      () => setParticles(prev => prev.filter(p => !batchIds.has(p.id))),
      700
    )

    // Skip request if already liked
    if (state.liked) return

    // Optimistic update
    setState(prev => (prev ? { likes: prev.likes + 1, liked: true } : prev))
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
      setState(prev => (prev ? { likes: prev.likes - 1, liked: false } : prev))
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
    <div
      style={{ display: 'inline-flex', flexDirection: 'column', gap: '10px' }}
    >
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        {/* Like button with particles */}
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          {particles.map(p => (
            <span
              key={p.id}
              aria-hidden='true'
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                fontSize: '16px',
                pointerEvents: 'none',
                animation: 'particle-fly 0.65s ease-out forwards',
                // @ts-expect-error css custom properties
                '--px': p.px,
                '--py': p.py,
              }}
            >
              {p.emoji}
            </span>
          ))}

          <button
            ref={buttonRef}
            onClick={handleLike}
            aria-label={liked ? `${likes} likes` : 'Like this post'}
            className='like-btn group flex items-center gap-1.5 rounded-full py-1.5 px-3 text-sm font-medium transition-all duration-200 hover:scale-110'
            style={{
              backgroundColor: liked
                ? 'var(--color-like-soft)'
                : 'var(--color-surface)',
              border: `1px solid ${liked ? 'var(--color-like-soft-border)' : 'var(--color-surface-border)'}`,
              color: liked ? 'var(--color-like)' : 'var(--color-subtle)',
              cursor: 'pointer',
            }}
          >
            <HeartIcon filled={liked} />
            <span>{likes}</span>
          </button>
        </div>

        {/* Share button */}
        {showShare && (
          <button
            onClick={handleShare}
            aria-label='Share this post'
            className='flex items-center gap-1.5 rounded-full py-1.5 px-3 text-sm font-medium'
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-surface-border)',
              color: 'var(--color-subtle)',
              cursor: 'pointer',
              animation:
                'share-pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                animation: 'share-nudge 0.6s ease-in-out 0.6s 2 forwards',
              }}
            >
              <ShareIcon />
            </span>
            <span
              key={String(copied)}
              style={{ animation: 'share-label-in 0.2s ease-out forwards' }}
            >
              {copied ? 'Copied!' : 'Share'}
            </span>
          </button>
        )}
      </div>

      {/* Encouraging text */}
      {showShare && (
        <p
          style={{
            margin: 0,
            fontSize: '13px',
            color: 'var(--color-subtle)',
            animation: 'share-text-in 0.4s ease-out 0.2s both',
          }}
        >
          You really love this one 🥰 — mind sharing it with a friend?
        </p>
      )}
    </div>
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

function ShareIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8' />
      <polyline points='16 6 12 2 8 6' />
      <line x1='12' y1='2' x2='12' y2='15' />
    </svg>
  )
}
