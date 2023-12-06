/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';
import { v4 as uuidv4 } from 'uuid';

export const asyncForEach = async (array: any, callback: any) => {
  if (!Array.isArray(array)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Expected array.');
  }

  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
};

export const generateUniqueTransactionId = (): string => {
  const timestamp = Date.now();
  const uuid = uuidv4();
  return `${timestamp}-${uuid}`;
};
