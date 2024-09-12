import fs from 'node:fs/promises';

//import { PATH_DB } from '../constants/contacts.js';

export const writeContacts = async (file, updatedContacts) => {
  // const data = updatedContacts;
  const fileWrite = file;
  try {
    //await fs.writeFile(PATH_DB, JSON.stringify(updatedContacts)); // write in strting form
    await fs.writeFile(fileWrite, JSON.stringify(updatedContacts, null, 2));
    // console.log('Дані успішно записані у файл.');
  } catch (err) {
    console.error('Помилка запису у файл:', err);
  }
};
