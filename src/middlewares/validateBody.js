// src/middlewares/validateBody.js

import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  console.log('валідація POST ');
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad You Request. Check argument', {
      errors: err.details,
    });
    next(error);
  }
};
