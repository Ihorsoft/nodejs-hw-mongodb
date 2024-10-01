// src/middlewares/errorHandler.js
import { HttpError } from 'http-errors';
export const errorHandler = (err, req, res, next) => {
  // have error from HttpError

  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }
  // error not describe. May be our error
  res.status(500).json({
    status: 500,
    message: 'Something went wrong in code',
    data: err.message,
  });
};
