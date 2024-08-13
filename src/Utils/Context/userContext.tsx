'use client'
import React, { PropsWithChildren, useEffect } from "react";
import { createContext, useState, useContext } from "react";
import { AllUsers, MyUser } from "../Types&Interfaces/user";


type UserContextType = {
    user: MyUser | null,
    updateUser: (user: MyUser | null) => void;
}


export const UserContext = createContext<UserContextType>({
    user: null,
    updateUser: () => {}
})


export const UserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<MyUser | null>(null);

    const updateUser = (newuser: MyUser | null) => {
        console.log(newuser, 'new');
        setUser(newuser);
        console.log(user, 'userincontext')
        // return user;
    };

    useEffect(() => {
        console.log(user, 'user in context updated');
    }, [user]);



    return (
        <UserContext.Provider value={{ user: user, updateUser: updateUser }}>
            {children}
        </UserContext.Provider>
    );
};



export const useUserContext = () => {
    const context = useContext(UserContext);
   
    if (!context) {
      throw new Error("useUserContext must be used inside the ThemeProvider");
    }
   
    return context;
  };





