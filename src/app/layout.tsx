import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/providers'

export const metadata: Metadata = {
  title: 'Build what users really want | Appraise',
  description: 'For the entrepreneurs, startup enthusiasts & developers'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <Providers>{children}</Providers>
    </html>
  )
}
