import { Message } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createMessage = async (data: Message): Promise<Message> => {
  const result = await prisma.message.create({
    data,
  });
  return result;
};

const getAllMessage = async (filters: {
  senderId: string;
  receiverId: string;
}): Promise<Message[]> => {
  const { senderId, receiverId } = filters;

  const result = await prisma.message.findMany({
    where: {
      OR: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  return result;
};

export const MessageService = {
  createMessage,
  getAllMessage,
};
