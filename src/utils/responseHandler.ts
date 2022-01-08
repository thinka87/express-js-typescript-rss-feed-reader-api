import { Response } from 'express';
export const ErrorResponse = (res: Response, error: { message: string }, code = 400): Response => {
  return res.status(code).json({ success: false, errorMessage: error.message, error });
};

export const SuccessResponse = (res: Response, data: any, message: string, code = 200): Response => {
  return res.status(code).json({ success: true, data, message });
};
