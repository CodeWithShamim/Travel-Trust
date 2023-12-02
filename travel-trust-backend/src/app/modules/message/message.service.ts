import { Message } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createMessage = async (data: Message): Promise<Message> => {
  const result = await prisma.message.create({
    data,
  });
  return result;
};

const getAllMessage = async (): Promise<Message[]> => {
  const result = await prisma.message.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return result;
};

export const MessageService = {
  createMessage,
  getAllMessage,
};
