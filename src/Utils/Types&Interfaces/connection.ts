import { User } from "./user";

export interface Connection {
    id: number;
    initiator: User;
    initiatorId: number;
    acceptor: User;
    acceptorId: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }