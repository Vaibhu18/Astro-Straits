import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "./lib/dbConnection";
import userModel from "./models/User";

export const { handlers, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await userModel.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        if (!(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error("Invalid password");
        }

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await dbConnect();
      const existingUser = await userModel.findOne({ email: user.email });
      if (!existingUser) {
        await userModel.create({
          name: user.name,
          email: user.email,
          profileImage: user.image,
        });
      }
      return true;
    },
    async session({ session }) {
      await dbConnect();
      const dbUser = await userModel.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.id = dbUser._id.toString();
      }
      return session;
    },
  },
});
