// import { ILogin, authInterface, credsInterface } from "@/inteface/auth";
import { createContext } from "react";
import { authInterface, MyUser } from "../Types&Interfaces/user";

export const defaultAuth:authInterface = {
    value:null,
    isLogedIn:false,
    update :({ value }: {
        value: MyUser | null
      })=>{}
}

export const AuthContext = createContext<authInterface>(defaultAuth)