import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    console.log('Hello')
    return(res)
}

export default handler;
 // try {
    //     // let data = req.body;

    //     if (req.method === 'POST') {
    //         console.log(req.body, 'body')
   
    //         if (!image) return res.status(400).json({ message: 'Missing image' });
    //         const salt = bcrypt.genSaltSync(saltRounds);
    //         const hash = bcrypt.hashSync(req.body.password, salt);
    //         req.body.password = hash;
    //         try {
    //             const existingUser = await prisma.user.findUnique({
    //                 where: { email },
    //             });
    //             if (!existingUser) {
    //                 const user = await prisma.user.create({
    //                     data: req.body
    //                 })
    //                 return res.send('User Created Successfully');
    //             } else {
    //                 return res.status(409).json({ message: 'User already exists' }); // Corrected: Changed status code to 409 for conflict
    //             }
    //         } catch (error: any) {
    //             return res.status(500).json({ message: error.message }); // Corrected: Added return to stop execution
    //         }
    //     }
    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({ message: "Internal Server Error" }); // Corrected: Added return to stop execution and provided a generic error message
    // }
    // if (!firstname) return res.json({ message: 'Missing firstname' });
        // if (!lastname) return res.json({ message: 'Missing lastname' });
        // if (!email) return res.json({ message: "Missing email" });
        // if (!password) return res.json({ message: 'Missing password' });
        // if (!country) return res.json({ message: 'Missing country' });
        // if (!level) return res.json({ message: 'Missing level' });
        // if (!specialization) return res.json({ message: 'Missing specialization' });


        // const existingUserByEmail = await prisma.user.findUnique({
        //     where: { email: email },
        // });

        // if (existingUserByEmail) {
        //     return NextResponse.json({
        //         message: "user with email already exists"
        //     })

        // }

        // const hashedPassword = await hash(password, 10);

        // // console.log('user', body)

        // const newUser = await prisma.user.create({
        //     data: {
        //         firstname: body.firstname,
        //         lastname: body.lastname,
        //         password: hashedPassword,
        //         email: body.email,
        //         country: body.country,
        //         specialization: body.specialization,
        //         level: body.level,
        //         image: body.image
        //     }
        // });

        // return NextResponse.json({
        //     status: 201,
        //     message: "User created successfully",
        //     user: newUser,
        // })