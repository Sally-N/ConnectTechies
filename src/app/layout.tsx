import React from 'react'
import { ConnectTechiesTheme } from '@/Utils/Theme/customTheme'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import SessionWrapper from '@/components/auth/sessionwrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Connect Techies',
  description: 'WebApp to connect with others in Tech',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <SessionWrapper> */}
          <ConnectTechiesTheme childrenElements={children} />
        {/* </SessionWrapper> */}
      </body>
    </html>
  )
}
