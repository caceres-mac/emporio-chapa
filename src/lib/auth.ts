import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

// Mock users for build - will use real Prisma in runtime
const mockUsers = [
  {
    id: '1',
    email: 'techista@emporio.com',
    password: '$2a$10$abcdefghijklmnopqrstuvwxyz1234567890',
    name: 'Martín García',
    role: 'techista',
    points: 2840
  },
  {
    id: '2',
    email: 'admin@emporio.com',
    password: '$2a$10$abcdefghijklmnopqrstuvwxyz1234567890',
    name: 'Admin Emporio',
    role: 'admin',
    points: 0
  }
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        accountType: { label: 'Account Type', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = mockUsers.find(u => u.email === credentials.email)
          if (!user) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          // Verify account type matches
          if (user.role !== credentials.accountType) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            points: user.points
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.points = (user as any).points
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.points = token.points as number
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET
}
