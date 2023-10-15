import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { IGenericErrorResponse } from '../interfaces/common';

const handleValidationError = (
  error: PrismaClientValidationError
): IGenericErrorResponse => {
  const errors = [
    {
      path: '',
      message: error.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
