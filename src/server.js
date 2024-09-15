// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
// import dotenv from 'dotenv';
import { env } from './utils/env.js';
import { getAllStudents, getStudentById } from './services/contacts.js';

// dotenv.config();

// const PORT = 3000;
// Читаємо змінну оточення PORT
// const PORT = Number(process.env.PORT);

const PORT = env('PORT', '3000');

export const startServer = () => {
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

  app.get('/students', async (req, res) => {
    const students = await getAllStudents();
    res.status(200).json({
      data: students,
    });
  });

  app.get('/students/:studentId', async (req, res, next) => {
    const { studentId } = req.params;
    const student = await getStudentById(studentId);

    if (!student) {
      res.status(404).json({
        message: 'Student not found',
      });
      return;
    }

    res.status(200).json({
      data: student,
    });
  });

  // collection contacts

  app.get('/contacts', async (req, res) => {
    const students = await getAllStudents();
    res.status(200).json({
      data: students,
    });
  });

  app.get('/contacts/:studentId', async (req, res, next) => {
    const { studentId } = req.params;
    const student = await getStudentById(studentId);

    if (!student) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }

    res.status(200).json({
      data: student,
    });
  });

  //

  //  не підішов жоден маршрут . останній middleware  status 404
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  // Middleware для обробких помилок
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'in Site  Something went wrong',
      error: err.message,
    });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
