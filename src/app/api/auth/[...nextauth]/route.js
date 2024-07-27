// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaClient } from "@prisma/client";
// const bcrypt = require('bcrypt');

// const prisma = new PrismaClient();


// const authOptions = {
//     secret: process.env.NEXTAUTH_SECRET,
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "text", placeholder: "" },
//                 password: { label: "Password", type: "text", placeholder: "******" }
//             },

//             async authorize(credentials, req) {

//                 if (!credentials.email || !credentials.password) {
//                     return null;
//                 }

//                 const existingUserByEmail = await prisma.user.findUnique({
//                     where: { email: credentials.email }
//                 })

//                 if (!existingUserByEmail) {
//                     return null
//                 }

//                 const isPasswordMatch = await bcrypt.compare(credentials.password, existingUserByEmail.password);

//                 if (!isPasswordMatch) {
//                     return null
//                 }

//                 console.log({
//                     id: existingUserByEmail.id + "",
//                     email: existingUserByEmail.email,
//                     name: existingUserByEmail.firstname,
//                     image: existingUserByEmail.image,
//                 })

//                 return {
//                     existingUserByEmail
//                 }
//             }
//         }),
//         GithubProvider({
//             clientId: process.env.GITHUB_ID,
//             clientSecret: process.env.GITHUB_SECRET,


//         }),
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,

//         })
//     ],
//     pages: {
//       signIn: "/auth/signin",
//     },
//     callbacks: {
//         async signIn({ user, account, profile, email, credentials }) {
//           if (account.provider === "credentials") {
//             return true; // Allow credentials login
//           } else {
//             // For OAuth providers (Google, GitHub), check if user exists in the database
//             const userInDb = await prisma.user.findUnique({
//               where: { email: user.email }
//             });
    
//             if (userInDb) {
//               return true; // Allow login if user exists in the database
//             } else {
//               return false; // Deny login if user does not exist
//             }
//           }
//         },
//         async jwt({ token, user }) {
//           if (user) {
//             token.id = user.id;
//           }
//           return token;
//         },
//         async session({ session, token }) {
//           if (token) {
//             session.user.id = token.id;
//           }
//           return session;
//         }

// }
// }




// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
// // import NextAuth from "next-auth";
// // import Providers from "next-auth/providers";
// // import { PrismaClient } from "@prisma/client";

// // const prisma = new PrismaClient();

// // const authOptions = ({
// //   providers: [
// //     Providers.Google({
// //       clientId: process.env.GOOGLE_CLIENT_ID,
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// //     }),
// //     Providers.GitHub({
// //       clientId: process.env.GITHUB_CLIENT_ID,
// //       clientSecret: process.env.GITHUB_CLIENT_SECRET,
// //     }),
// //     Providers.Credentials({
// //     //   id: "login",
// //       name: "Credentials",
// //       credentials: {
// //         email: { label: "Email", type: "text" },
// //         password: { label: "Password", type: "password" }
// //       },
// //       async authorize(credentials, req) {
// //         const user = await prisma.user.findUnique({
// //           where: { email: credentials.email }
// //         });

// //         if (user && user.password === credentials.password) {
// //           return { id: user.id, email: user.email };
// //         } else {
// //           return null;
// //         }
// //       }
// //     })
// //   ],
// //   pages: {
// //     signIn: "/login",
// //   },
// //   callbacks: {
// //     async signIn(user, account, profile) {
// //       if (account.provider === "credentials") {
// //         return true; // Allow credentials login (handled in authorize method)
// //       } else {
// //         // For OAuth providers (Google, GitHub), check if user exists in the database
// //         const userInDb = await prisma.user.findUnique({
// //           where: { email: user.email }
// //         });

// //         if (userInDb) {
// //           return true; // Allow login if user exists in the database
// //         } else {
// //           return false; // Deny login if user does not exist
// //         }
// //       }
// //     },
// //     // async jwt(token, user) {
// //     //   if (user) {
// //     //     token.id = user.id;
// //     //   }
// //     //   return token;
// //     // },
// //     // async session(session, token) {
// //     //   session.user.id = token.id;
// //     //   return session;
// //     // }
// //   }
// // });



// // export const authOptions = {
// //     session: {
// //         strategy: 'jwt'
// //     },
// //     providers: [
// //         CredentialsSignin({

// //         })
// //     ]
// // }