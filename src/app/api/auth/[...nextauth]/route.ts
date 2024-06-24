import NextAuth, { SessionStrategy } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
export const authOptions = {
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
  // session: {
  //   maxAge: 24 * 60 * 60,
  //   strategy: 'jwt' as SessionStrategy
  // },
  // callbacks: {},
  secret: process.env.NEXTAUTH_SECRET
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
