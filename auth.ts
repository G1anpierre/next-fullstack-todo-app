import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import DiscordProvider from 'next-auth/providers/discord'
import GoogleProvider from 'next-auth/providers/google'
import {NextAuthOptions} from 'next-auth'
import Stripe from 'stripe'

import bcrypt from 'bcrypt'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import {prisma} from '@/app/lib/database-prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const auth: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
    signOut: '/logout',
    // error: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  debug: true,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
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

        const isValid = await bcrypt.compare(password, String(user.password))

        if (isValid) {
          return user
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({token, user, account}) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.id = token.sub
        token.stripeCustomerId = user?.stripeCustomerId
        token.isActive = user?.isActive
      }
      return token
    },
    async session({session, token, user}) {
      // Send properties to the client, like an access_token and user id from a provider.

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          stripeCustomerId: token?.stripeCustomerId,
          isActive: token?.isActive,
        },
      }
    },
  },
  events: {
    async signIn({user, account, profile, isNewUser}) {
      const foundUser = await prisma.user.findUnique({
        where: {
          name: user.name!,
          email: user.email!,
        },
      })

      if (!foundUser?.stripeCustomerId) {
        const customer = await stripe.customers.create({
          name: user.name!,
          email: user.email!,
        })
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            stripeCustomerId: customer.id,
          },
        })
      }
    },
    createUser: async ({user}) => {
      const customer = await stripe.customers.create({
        name: user.name!,
        email: user.email!,
      })
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeCustomerId: customer.id,
        },
      })
    },
  },
}

export default auth
