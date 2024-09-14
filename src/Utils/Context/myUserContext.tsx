import { createContext } from "react";
import { authInterface, MyUser } from "../Types&Interfaces/user";

export const defaultAuth: authInterface = {
  value: null,
  isLoggedIn: false,
  update: ({ value }: {
    value: MyUser | null
  }) => { },
  isLoading: true,
}

export const AuthContext = createContext<authInterface>(defaultAuth)