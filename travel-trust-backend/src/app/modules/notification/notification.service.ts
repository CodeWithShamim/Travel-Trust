import { Notification } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllNotification = async (): Promise<Notification[]> => {
  const result = await prisma.notification.findMany({});
  return result;
};

export const NotifactionService = {
  getAllNotification,
};
