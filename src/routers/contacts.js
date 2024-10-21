// src/routers/contacts.js

import { Router } from 'express';
//import { getAllContacts, getContactById } from '../services/contacts.js';

//const router = Router();

/* router.get('/contacts', async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    data: contacts,
  });
});

router.get('/contacts/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId); */

// Відповідь, якщо контакт не знайдено
/* if (!contact) {
    res.status(404).json({
      message: 'Student not found',
    });
    return;
  }

  // Відповідь, якщо контакт знайдено
  res.status(200).json({
    data: contact,
  });
}); */

import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const router = Router();

router.use(authenticate); // аутентифікація user і  запис user в  req.user через middleware

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post(
  '/register',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));
router.put(
  '/:contactId',
  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
export default router;
