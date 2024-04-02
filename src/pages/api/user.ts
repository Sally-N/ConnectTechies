import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import { User } from "@/Utils/Types&Interfaces/user";

const saltRounds = 10;

const prisma = new PrismaClient(); // Corrected: You need to initialize PrismaClient

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let data = req.body;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(data.password, salt);
        data.password = hash;

        if (req.method === 'POST') {
            const { firstname, lastname, email, password } = req.body as User;
            if (!firstname) return res.status(400).json({ message: 'Missing firstname' }); // Corrected: Added return to stop execution
            if (!lastname) return res.status(400).json({ message: 'Missing lastname' }); // Corrected: Added return to stop execution
            if (!email) return res.status(400).json({ message: "Missing email" }); // Corrected: Added return to stop execution
            if (!password) return res.status(400).json({ message: 'Missing password' }); // Corrected: Added return to stop execution
            
            try {
                const existingUser = await prisma.user.findUnique({
                    where: { email },
                });
                if (!existingUser) {
                    const user = await prisma.user.create({
                        data: req.body
                    })
                    return res.send('User Created Successfully');
                } else {
                    return res.status(409).json({ message: 'User already exists' }); // Corrected: Changed status code to 409 for conflict
                }
            } catch (error: any) {
                return res.status(500).json({ message: error.message }); // Corrected: Added return to stop execution
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" }); // Corrected: Added return to stop execution and provided a generic error message
    }
}

export default handler;