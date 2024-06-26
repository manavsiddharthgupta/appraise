import NextAuth, { SessionStrategy } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { Adapter } from 'next-auth/adapters'

const prisma = new PrismaClient()
export const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  session: {
    maxAge: 24 * 60 * 60,
    strategy: 'jwt' as SessionStrategy
  },
  callbacks: {},
  secret: process.env.NEXTAUTH_SECRET
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
