import { Connection } from "./connection";
import { Profile } from "./profile";

export type AllUsers = MyUser[];

export interface MyUser {
  status: number
  message: string
  user: User
  connections: any[]
  notifications: Notification[]
  userChats: any[]
  profile: Profile
}

  export interface User {
    id: number
    email: string
    firstname: string
    lastname: string
    password: string
    createdAt: string
    updatedAt: string
  }


  

  

  
 