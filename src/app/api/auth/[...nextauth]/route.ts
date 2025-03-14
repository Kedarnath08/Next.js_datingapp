import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";
import type { Session, Account, User } from "next-auth";

// ✅ Define a custom user type that includes `accessToken`
interface ExtendedUser extends User {
  accessToken?: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      if (account) {
        token.accessToken = account.access_token; // Store accessToken inside token
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as ExtendedUser).accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // Required for Next.js apps without a backend
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
