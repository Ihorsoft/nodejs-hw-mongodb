// src/controllers/contacts.js

import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const user = req.user._id;
  const contacts = await getAllContacts(
    {
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    },
    user,
  );

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const user = req.user;
  try {
    const contact = await getContactById(contactId, user);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    // Відповідь, якщо контакт знайдено
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    throw createHttpError(404, `Contact with Id: ${contactId} not found`);
  }
};

export const createContactController = async (req, res, next) => {
  const contact = await createContact(req.body, req.user);
  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    next(
      createHttpError(404, `Contact with Id  ${contactId} not found in db!`),
    );
    return;
  }
  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body, { upsert: true });
  if (!result) {
    next(createHttpError(404, `Contact with Id ${contactId}  not found !`));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: `Successfully update a contact Id ${contactId} !`,
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;
  let photoUrl;
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }

    // photoUrl = await saveFileToUploadDir(photo);
  }

  const result = await updateContact(contactId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, `Contact with Id ${contactId} not found`));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact Id: ${contactId}!`,
    data: result.contact,
  });
};
