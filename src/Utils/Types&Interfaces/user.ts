import { Chat } from "@prisma/client";
import { Connection } from "./connection";
import { Profile } from "./profile";

export type AllUsers = MyUser[];

export interface MyUser {
  status: number
  message: string
  user: User
  connections: Connection[]
  notifications: Notification[]
  chats: Chat[]
  profile: Profile
}

  export interface User {
    id: number
    email: string
    uniqueId: string
    firstname: string
    lastname: string
    password: string
    createdAt: string
    updatedAt: string
  }


    export interface authInterface {
      value: null | MyUser;
      isLoggedIn: boolean;
      update: ({ value }: {
        value: MyUser | null
      }) => void;
      isLoading: boolean
    }


  

  

  
 