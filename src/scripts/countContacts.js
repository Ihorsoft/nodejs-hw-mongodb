import { readContacts } from '../utils/readContacts.js'; // worning '.js'  is important

export const countContacts = async () => {
  const contacts = await readContacts();
  return contacts.length;
};

console.log(await countContacts());
