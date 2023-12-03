import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { MessageService } from './message.service';
import { Request, Response } from 'express';
import { Message } from '@prisma/client';
import { MessageFilterableFields } from './message.contant';
import pick from '../../../shared/pick';

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
  const filters = pick(req.query, MessageFilterableFields);

  const result = await MessageService.getAllMessage(
    filters as {
      senderId: string;
      receiverId: string;
    }
  );

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
