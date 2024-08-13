import { MyUser, User } from "@/Utils/Types&Interfaces/user";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function useGetUserById(userid: Number) {
    const [users, setUsers] = useState<MyUser>();
    // const [isPending, setIsPending] = useState(false);


    useEffect(() => {

        const fetchUser = async () => {
            // setIsPending(true);
            try {
                const res = await fetch(`/api/users/${userid}`, {
                    method: 'GET'
                });

                const responseData = await res.json();
                console.log(responseData, 'ress')
                setUsers(responseData);
                return users;

                return responseData;

                // if (responseData && responseData.users) {
                //     setUsers(responseData.users as MyUser);
                //     setIsPending(false);
                //     // Update only the users array

                // } else {
                //     console.error("Invalid response data:", responseData);
                //     setIsPending(false);
                // }

            } catch (err) {
                console.error("Error fetching user data:", err);
                // setIsPending(false);
            }
        }

        fetchUser();

    }, []);

    return ({ users })

}


export function useGetUser(){
    const loggedInUser = Cookies.get('user');
    let user;

    if (loggedInUser) {
        user = JSON.parse(loggedInUser) as unknown as MyUser;
    }
    console.log(loggedInUser, user, 'lu')

    return user;
}

