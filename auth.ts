import CredentialsProvider from 'next-auth/providers/credentials'
import {NextAuthOptions} from 'next-auth'

import {z} from 'zod'
import bcrypt from 'bcrypt'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import {prisma} from '@/app/lib/database-prisma'

const auth: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: {label: 'name', type: 'text'},
        email: {label: 'email', type: 'email'},
        password: {label: 'password', type: 'password'},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const {email, password} = credentials
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        })
        if (!user) {
          return null
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (isValid) {
          return user
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({token, account}) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.id = token.sub
      }
      return token
    },
    async session({session, token, user}) {
      // Send properties to the client, like an access_token and user id from a provider.
      // session.user.id = token.id
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      }
    },
  },
}

export default auth
