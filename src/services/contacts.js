// src/services/contacts.js

import { ContactsCollection } from '../db/models/contact.js';
import createHttpError from 'http-errors';
import { faker } from '@faker-js/faker';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
//import { createDefaultContact } from '../utils/createFakeContact.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  /* const contacts = await ContactsCollection.find();
  return contacts; */

  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  /* if (filter.gender) {
    contactsQuery.where('gender').equals(filter.gender);
  }
  if (filter.maxAge) {
    contactsQuery.where('age').lte(filter.maxAge);
  }
  if (filter.minAge) {
    contactsQuery.where('age').gte(filter.minAge);
  }
  if (filter.maxAvgMark) {
    contactsQuery.where('avgMark').lte(filter.maxAvgMark);
  }
  if (filter.minAvgMark) {
    contactsQuery.where('avgMark').gte(filter.minAvgMark);
  } */

  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);

  return contact;
};

export const createContact = async (payload) => {
  console.log('before ', payload);
  if (!payload) {
    payload = {
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      email: faker.internet.email(),
      isFavourite: false,
      contactType: 'personal',
    };
  }
  console.log('after:', payload);

  const contact = await ContactsCollection.create(
    /*  (payload = {
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      email: faker.internet.email(),
      isFavourite: false,
      contactType: 'personal',
    }), */

    payload,
  );
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
