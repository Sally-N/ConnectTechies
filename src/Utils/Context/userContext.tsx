import React, { PropsWithChildren } from "react";
import { createContext, useState, useContext } from "react";
import { AllUsers, MyUser } from "../Types&Interfaces/user";


type UserContextType = {
    user: MyUser | undefined,
    setUser: (user: MyUser | undefined) => void;
}


export const UserContext = createContext<UserContextType | undefined>(undefined)


export const UserProvider = ({ children }: PropsWithChildren<{}> ) => {
    const [user, setUser] = useState<MyUser | undefined>(undefined);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}


export const useUserContext = () => {
    const context = useContext(UserContext);
   
    if (!context) {
      throw new Error("useThemeContext must be used inside the ThemeProvider");
    }
   
    return context;
  };





