import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';
import { getAllContacts } from './getAllContacts.js';

const generateContacts = async (number) => {
  // const newArr = [];

  const contacts = await getAllContacts();
  let i = 1;
  do {
    const contactNew = createFakeContact();
    contacts.push(contactNew);
    i++;
  } while (i <= number);

  writeContacts(PATH_DB, contacts);
};

generateContacts(5);
// console.log('in files :', await readContacts());
