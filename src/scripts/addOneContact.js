// import fs from 'node:fs/promises';
import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';
import { PATH_DB } from '../constants/contacts.js';

export const addOneContact = async () => {
  const contacts = await readContacts();
  const newContact = createFakeContact();
  contacts.push(newContact);
  // console.log('in memory :', contacts);
  writeContacts(PATH_DB, contacts);
};

addOneContact();
// console.log('in files :', await readContacts());
