import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/contacts.js';

export const readContacts = async () => {
  try {
    const contacts = await fs.readFile(PATH_DB);
    // console.log(contacts.toString()); // returned promise {<pending>}
    return JSON.parse(contacts);
  } catch (error) {
    console.error('error:', error);
  }
};

//readContacts();

// console.log(readContacts());  // returned in JSON format - promise
// console.log(await readContacts()); // returned  parse
