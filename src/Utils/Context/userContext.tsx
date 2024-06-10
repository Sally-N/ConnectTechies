import { createContext, useState } from "react";
import { AllUsers, User } from "../Types&Interfaces/user";





export interface IAllUsersContext {
    allUsers: AllUsers | null;
}

export const allUsersContext: IAllUsersContext = {
    allUsers: null,

}


export const UsersAllContext = createContext<IAllUsersContext>(allUsersContext);




export const UsersProvider = ({
    childrenElements,
}: {
    childrenElements: React.ReactNode,

}) => {

    const [allUsers, setAllUsers] = useState<AllUsers | null>(null);

    return (
        <UsersAllContext.Provider
        value={{
            allUsers: allUsers
        }}>
            {childrenElements}
        </UsersAllContext.Provider>
    )

}


