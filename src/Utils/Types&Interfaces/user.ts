import { Connection } from "./connection";

export type AllUsers = User[];
export interface User {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    specialization: string;
    level: string;
    country: string;
    image?: string | null;
    inititatedConnetions: Connection[];
    acceptorConnetions: Connection[];
    createdAt: Date;
    updatedAt: Date;
  }