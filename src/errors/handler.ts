import { ErrorRequestHandler } from 'express';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  console.error(error);

  return response.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
