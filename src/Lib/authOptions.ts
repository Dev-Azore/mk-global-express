import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import type { AuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    username?: string;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      username?: string | null;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    username?: string | null;
    role?: string;
  }
}

export const authOptions: AuthOptions = {
  debug: false,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const identifier = credentials.email.toLowerCase().trim();

          // Find user by email OR username
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { email: identifier },
                { username: identifier }
              ]
            },
            select: {
              id: true,
              name: true,
              email: true,
              username: true,
              password: true,
              role: true,
            },
          });

          if (!user || !user.password) {
            return null;
          }

          // Compare hashed password
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_local_dev_only_replace_in_production",

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const { name, email, image } = user;

          if (!email) return false;

          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email },
            select: { id: true, role: true },
          });

          if (existingUser) {
            // User exists, update last login
            await prisma.user.update({
              where: { email },
              data: { updatedAt: new Date() },
            });

            // Add role to user object for JWT
            user.role = existingUser.role;
            user.id = existingUser.id;
          } else {
            // Create new user
            const newUser = await prisma.user.create({
              data: {
                name: name || "",
                email,
                image,
                role: "USER",
              },
              select: {
                id: true,
                role: true,
              },
            });

            // Create wallet for new user
            await prisma.wallet.create({
              data: {
                userId: newUser.id,
                balance: 0,
              },
            });

            user.role = newUser.role;
            user.id = newUser.id;
          }

          return true;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
      }

      // For Google OAuth, get user data from database
      if (account?.provider === "google" && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
            role: true,
          },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.username = dbUser.username;
          token.role = dbUser.role;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          username: token.username,
          role: token.role,
        };
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};
