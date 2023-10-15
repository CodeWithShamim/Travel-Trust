import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { IGenericErrorMessage } from '../interfaces/error';

const handleClientError = (error: PrismaClientKnownRequestError) => {
  const statusCode = 400;
  let message = '';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error.code === 'P2025') {
    message = (error.meta?.cause as string) || 'Record not found!';
    errorMessages = [
      {
        path: '',
        message,
      },
    ];
  } else if (error.code === 'P2003') {
    const errorFieldName = (error.meta?.field_name as string).split('_');
    message = `${errorFieldName[errorFieldName.length - 2]} is invalid!`;
    errorMessages = [
      {
        path: '',
        message,
      },
    ];
  }

  return {
    statusCode,
    message,
    errorMessages,
  };
};

export default handleClientError;
