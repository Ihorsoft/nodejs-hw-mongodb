import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';
//import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';
import { getAllContacts } from './getAllContacts.js';

const generateContactsPart = async (number) => {
  const contacts = await getAllContacts();
  let i = 0;

  function count() {
    if (i < number - 3) {
      setTimeout(count);
    }

    do {
      let contactNew = createFakeContact();
      contacts.push(contactNew);
      i++;
    } while (i % 3 != 0 && i < number);

    if (i == number) {
      writeContacts(PATH_DB, contacts);
      return;
    }
  }

  count();
};

generateContactsPart(5);
//console.log('in files :', await readContacts());
