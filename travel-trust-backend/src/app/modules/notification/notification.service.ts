import { Notification } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllNotification = async (): Promise<Notification[]> => {
  const result = await prisma.notification.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return result;
};

export const NotifactionService = {
  getAllNotification,
};
