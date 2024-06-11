import NextAuth, { NextAuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/config/prisma';

const options: NextAuthOptions = {
  providers: [
    Auth0Provider({
      wellKnown: `https://${process.env.AUTH0_DOMAIN}/`,
      issuer: process.env.AUTH0_DOMAIN,
      authorization: `https://${process.env.AUTH0_DOMAIN}/authorize?response_type=code&prompt=login`,
      clientId: `${process.env.AUTH0_CLIENT_ID}`,
      clientSecret: `${process.env.AUTH0_CLIENT_SECRET}`,
    }),
  ], 
  secret: process.env.AUTH0_CLIENT_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }: any) {
      // Añadir el ID del usuario a la sesión
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
export { options };