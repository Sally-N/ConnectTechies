import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import { User } from "@/Utils/Types&Interfaces/user";

const saltRounds = 10;


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let data = req.body;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(data.password, salt);
        data.password = hash

        if (req.method === 'POST') {
            const { firstname, lastname, email, password } = req.body as User;
            if (!firstname) res.status(400).json({ message: 'Missing firstname' });
            if (!lastname) res.status(400).json({ message: 'Missing lastname' });
            if (!email) res.status(400).json({ message: "Missing email" });
            if (!password) res.status(400).json({ message: 'Missing password' });
            try {
                const existingUser = await prisma.user.findUnique({
                    where: { email },
                });
                if (!existingUser) {
                    const user = await prisma.user.create({
                        data: req.body
                    })
                    return res.send('User Created Successfully')
                } else {
                    res.status(404).json({ message: 'User already exists' });
                }
            } catch (error: any) {
                res.status(500).json({ message: error.message })
            }
        }
    } catch (error) {
        console.log(error);
        // if (error.meta){

        // }

    }
}


export default handler;
























