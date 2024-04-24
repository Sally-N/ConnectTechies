var fs = require('fs');
import { pipeline } from 'stream';
import { promisify } from 'util';
const pump = promisify(pipeline);
import { NextResponse } from "next/server";
import { prisma } from "../../route";




export const config = {
    api: {
        bodyParser: false,
    },
};

////update profile
export async function POST(req: any, context: any, res: Response) {
    try {

        const formdata = await req.formData();
        const {params} =  context;
        const userId = Number(params.userid);


        console.log(userId, 'id')
        console.log(formdata, 'fd')

        // console.log(formdata.get('firstname'));
        // let img: string;



        console.log(typeof formdata.get('image'), 'body')

        const file = formdata.get('image');
        console.log(file, 'fild')
        for (let image of formdata) {
            console.log(image + ":", formdata[image]);
        }
        //   console.log(JSON.parse(file), 'fildfghjkd')


        let timeStamp = Date.now();
        const filePath = `./public/userImages/${timeStamp}${file!.name}`;
        const filePathdb = `/public/userImages/${timeStamp}${file!.name}`;
        await pump(file.stream(), fs.createWriteStream(filePath));



        const updateUser = await prisma.user.update({
            where: {
                id: (userId)
            },
            data: {
                country: formdata.get('country'),
                specialization: formdata.get('specialization'),
                level: formdata.get('level'),
                image: filePathdb
            }
        });

        return NextResponse.json({
            status: 201,
            message: "User updated successfully",
            user: updateUser,
        })


    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Error updating user', success: false });
    }
};


export async function GET() {

    const allUsers = await prisma.user.findMany();

    return NextResponse.json({
        status: 201,
        message: 'All users in the database',
        users: allUsers
    })
}




