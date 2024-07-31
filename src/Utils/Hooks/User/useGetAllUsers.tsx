import { MyUser, User } from "@/Utils/Types&Interfaces/user";
import { useEffect, useState } from "react";

export function useGetAllUsersData() {
    const [users, setUsers] = useState<User[]>([]);
    const [isPending, setIsPending] = useState(false);


    useEffect(() => {

        const fetchUsers = async () => {
            setIsPending(true);
            try {
                const res = await fetch("/api/users", {
                    method: 'GET'
                });

                const responseData = await res.json();
                console.log(responseData,)

                if (responseData && responseData.users) {
                    setUsers(responseData.users as User[]);
                    setIsPending(false);
                    // Update only the users array

                } else {
                    console.error("Invalid response data:", responseData);
                    setIsPending(false);
                }

            } catch (err) {
                console.error("Error fetching user data:", err);
                setIsPending(false);
            }
        }

        fetchUsers();

    }, []);

    return ({ users, isPending })

}

