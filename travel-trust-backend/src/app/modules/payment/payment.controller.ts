import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Payment } from '@prisma/client';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { PaymentFilterableFields } from './payment.constant';
import { PaymentService } from './payment.service';

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await PaymentService.createPaymentIntent(data);

  sendResponse<{ clientSecret: string }>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment intent created successfully',
    data: { clientSecret: result as string },
  });
});

const getAllPayment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, PaymentFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await PaymentService.getAllPayment(filters, options);

  sendResponse<Payment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PaymentService.getSinglePayment(id);

  sendResponse<Payment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment retrieved successfully',
    data: result,
  });
});

const updatePayment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await PaymentService.updatePayment(id, data);

  sendResponse<Payment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment updated successfully',
    data: result,
  });
});

const deletePayment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PaymentService.deletePayment(id);

  sendResponse<Payment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment deleted successfully',
    data: result,
  });
});

export const PaymentController = {
  createPaymentIntent,
  getAllPayment,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
