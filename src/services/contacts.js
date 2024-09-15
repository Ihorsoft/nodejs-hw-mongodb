// src/services/contacts.js

import { ContactsCollection } from '../db/models/contact.js';

export const getAllStudents = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getStudentById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};
