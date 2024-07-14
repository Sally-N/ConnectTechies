
export interface ChatInterface {
    id: number
    senderId: number
    recipientId: number
    createdAt: string
    updatedAt: string
  }

export interface MessageInterface {
    id: number
    chatId: number
    senderId: number
    text: string
    read: number
    socketId: string
    createdAt: string
    updatedAt: string
  }