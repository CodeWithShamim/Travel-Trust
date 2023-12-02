import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { MessageService } from './message.service';
import { Request, Response } from 'express';
import { Message } from '@prisma/client';

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await MessageService.createMessage(data);

  sendResponse<Message>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Message created successfully',
    data: result,
  });
});

const getAllMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.getAllMessage();

  sendResponse<Message[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Messages retrieved successfully',
    data: result,
  });
});

export const MessageController = {
  createMessage,
  getAllMessage,
};
