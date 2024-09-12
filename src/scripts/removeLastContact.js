import { readContacts } from '../utils/readContacts.js';
//import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/contacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const removeLastContact = async () => {
  const contacts = await readContacts();
  contacts.pop();
  await writeContacts(PATH_DB, contacts);
};

removeLastContact();
// console.log('in file:', await readContacts()); // with out await - returned promise
