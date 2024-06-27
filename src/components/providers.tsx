'use client'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/components/theme-provider'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import Navbar from '@/components/navbar'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

const Providers = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <SessionProvider>
      <body className={inter.className + ' min-h-screen'}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {pathname !== '/auth/signin' ? <Navbar /> : ''}
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </SessionProvider>
  )
}

export default Providers
