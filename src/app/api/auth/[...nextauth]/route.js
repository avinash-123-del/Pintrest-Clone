// next auth only works for login 

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  secret:process.env.SECRET
})


export {handler as GET, handler as POST}

// now search this page http://localhost:3000/api/auth/signin