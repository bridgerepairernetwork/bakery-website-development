import React from "react"
import type { Metadata, Viewport } from 'next'
import { Epilogue } from 'next/font/google'

import './globals.css'

const epilogue = Epilogue({ subsets: ['latin'], variable: '--font-epilogue' })

export const metadata: Metadata = {
  title: 'Perfect White | Exquisite Cakes & Events',
  description: 'Handcrafted celebration cakes and bespoke event catering designed for your most precious moments. Sophistication meets sweet perfection.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#002147',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={epilogue.variable}>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}
