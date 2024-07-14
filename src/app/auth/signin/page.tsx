'use client'
import { Button } from "antd";
import { signIn, getSession, getProviders, getCsrfToken } from "next-auth/react";

function signin() {
    return (
        <div>
            return (
            <div>
                <Button onClick={() => signIn('credentials')}>
                    Sign in with Credentials
                </Button>
                <Button onClick={() => signIn('github')}>
                    Sign Up with Github
                </Button>
                <Button onClick={() => signIn('google')}>

                </Button>
            </div>
            );
        </div>
    );
}

export default signin;

// export async function getServerSideProps(context: any) {
//     const { req } = context;
//     const session = await getSession({ req });

//     if (session) {
//         return {
//             redirect: { destination: "/" },
//         };
//     }

//     return {
//         props: {
//             providers: await getProviders(),
//             csrfToken: await getCsrfToken(context),
//         },
//     };
// }