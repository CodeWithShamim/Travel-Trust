import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { NotifactionService } from './notification.service';
import { Request, Response } from 'express';
import { Notification } from '@prisma/client';
import pick from '../../../shared/pick';

const getAllNotification = catchAsync(async (req: Request, res: Response) => {
  const data = pick(req.query, ['userId']);
  const result = await NotifactionService.getAllNotification(
    data?.userId as string
  );

  sendResponse<Notification[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Notifications retrieved successfully',
    data: result,
  });
});

export const NotifactionController = {
  getAllNotification,
};
