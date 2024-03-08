import NextAuth from 'next-auth'

import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  callbacks: {
    async signIn({ account, profile }) {
      if (!account) {
        return false
      }
      if (account.provider === 'google') {
        return Boolean(profile.email_verified)
      }
      return Boolean(profile.email)
    },
  },
  providers: [Google, GitHub],
})
