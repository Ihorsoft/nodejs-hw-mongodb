// src/validation/contacts.js

import Joi from 'joi';

/* export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(6).max(16).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  avgMark: Joi.number().min(2).max(12).required(),
  onDuty: Joi.boolean(),
}); */

/*  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }), */

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email(),
  contactType: Joi.string().valid('home', 'personal', 'add'),
  phoneNumber: Joi.string().min(2).max(13).required(),
  isFavorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  contactType: Joi.string().valid('home', 'personal', 'add'),
  phoneNumber: Joi.string().min(2).max(13),
  isFavorite: Joi.boolean(),
});

const dataToValidate = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  isFavorite: 'personel',
  phoneNumber: '+380505055555',
  contactType: false,
};

const validationResult = createContactSchema.validate(dataToValidate, {
  abortEarly: false,
});
if (validationResult.error) {
  console.error(validationResult.error.message);
} else {
  console.log('Data is valid!');
}
