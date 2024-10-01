// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

// Читаємо змінну оточення PORT
// const PORT = Number(process.env.PORT);

const PORT = env('PORT', '3000');

export const setupServer = () => {
  const app = express();

  // loging request in console in formating
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // log time of request
  app.use((req, res, next) => {
    console.log(`You time of request: ${new Date().toLocaleString()}`);
    next();
  });

  // Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах
  // наприклад, у запитах POST або PATCH. перевіряє чи в форматі json і парсить
  app.use(express.json());

  app.use(cors());

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!  Hello Ihor',
    });
  });

  // collection contacts

  /*  app.get('/contacts', async (req, res) => {
    const contacts = await getAllStudents();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getStudentById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  }); */

  app.use(contactsRouter);

  //  не підішов жоден маршрут . останній middleware  status 404
  /*   app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  }); */

  // Middleware для обробки власних помилок
  /*  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'in Site  Something went wrong',
      error: err.message,
    });
  });*/

  //console.log('server.js not routers ');
  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
