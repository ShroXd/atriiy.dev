import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { Crimson_Text, EB_Garamond, Libre_Baskerville, Montserrat, Open_Sans } from 'next/font/google'

import Footer from './components/footer'
import { Navbar } from './components/nav'
import './global.css'
import { baseUrl } from './sitemap'

const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-crimson-text',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eb-garamond',
})

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre-baskerville',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Atriiy',
    template: '%s | Atriiy',
  },
  description: 'Dev, using TypeScript, Rust and Golang. Writing, reading, and playing video games.',
  openGraph: {
    title: 'Atriiy',
    description: 'Dev, using TypeScript, Rust and Golang. Writing, reading, and playing video games.',
    url: baseUrl,
    siteName: 'Atriiy',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={cx(
        'bg-white text-black dark:bg-black dark:text-white',
        GeistSans.variable,
        GeistMono.variable,
        crimsonText.variable,
        ebGaramond.variable,
        libreBaskerville.variable,
        montserrat.variable,
        openSans.variable
      )}
    >
      <body className='mx-4 mt-8 max-w-2xl antialiased font-open-sans lg:mx-auto'>
        <main className='mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0'>
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
