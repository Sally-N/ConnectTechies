import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();


const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "" },
                password: { label: "Password", type: "text", placeholder: "******" }
            },

            async authorize(credentials, req) {

                if (!credentials.email || !credentials.password) {
                    return null;
                }

                const existingUserByEmail = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })

                if (!existingUserByEmail) {
                    return null
                }

                const isPasswordMatch = await bcrypt.compare(credentials.password, existingUserByEmail.password);

                if (!isPasswordMatch) {
                    return null
                }

                console.log({
                    id: existingUserByEmail.id + "",
                    email: existingUserByEmail.email,
                    name: existingUserByEmail.firstname,
                    image: existingUserByEmail.image,
                })

                return {
                    existingUserByEmail
                    // id: existingUserByEmail.id + "",
                    // email: existingUserByEmail.email,
                    // name: existingUserByEmail.firstname,
                    // image: existingUserByEmail.image,
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        })
    ]

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


// export const authOptions = {
//     session: {
//         strategy: 'jwt'
//     },
//     providers: [
//         CredentialsSignin({

//         })
//     ]
// }