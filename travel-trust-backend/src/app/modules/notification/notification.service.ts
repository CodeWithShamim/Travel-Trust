/* eslint-disable @typescript-eslint/no-explicit-any */
import { Notification } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllNotification = async (userId: string): Promise<Notification[]> => {
  const result = await prisma.notification.findMany({
    where: {
      OR: [{ userId }, { userId: null }],
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return result;
};

export const NotifactionService = {
  getAllNotification,
};
