import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export  async function POST(req, res) {
  if (req.method === 'POST') {
    const { senderId, message, receiverId, read } = req.body;

    try {
      const savedMessage = await prisma.message.create({
        data: {
          senderId,
          message,
          receiverId,
          read,
        //   socketId
        },
      });

      res.status(200).json(savedMessage);
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Failed to save message' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
