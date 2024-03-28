import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';

const saltRounds = 10;


export const register = async(req:NextApiRequest, res: NextApiResponse) => {
    try {
        let data = req.body;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(data.password, salt);
        data.password = hash

        await prisma.user.create( {
            data: req.body
        })
        return res.send('User Created Successfully')
    } catch (error) {
        console.log(error);
        // if (error.meta){

        // }
        
    }
}