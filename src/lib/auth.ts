import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoClient from "@/lib/mongodb";

const db = mongoClient.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: mongoClient,
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  // Requirement: "MongoDB with JWT" — session কে JWT ফরম্যাটে সাইন করা হচ্ছে
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60, // ১ ঘণ্টা cache
      strategy: "jwt",
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "candidate",
        input: true,
      },
    },
  },

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});