'use client'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/components/theme-provider'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <body className={inter.className + ' min-h-screen'}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </SessionProvider>
  )
}

export default Providers
