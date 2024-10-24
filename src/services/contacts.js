// src/services/contacts.js

import { ContactsCollection } from '../db/models/contact.js';
import createHttpError from 'http-errors';
import { faker } from '@faker-js/faker';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
//import { createDefaultContact } from '../utils/createFakeContact.js';

export const getAllContacts = async (
  {
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
  },
  user,
) => {
  /* const contacts = await ContactsCollection.find();
  return contacts; */
  console.log('user for all contact', user);
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find({ userId: user });

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

  const contactsCount = await ContactsCollection.find({ userId: user })
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

export const getContactById = async (contactId, user) => {
  const contact = await ContactsCollection.findById(contactId);

  if (contact.userId.toString() === user._id.toString()) {
    return contact;
  } else {
    return;
  }
};

export const createContact = async (payload, user, photoUrl) => {
  console.log('in create contact services photoUrl:', photoUrl);
  const contact = await ContactsCollection.create({
    ...payload,
    userId: user._id,
    photo: photoUrl,
  });

  console.log('new contact', contact.photo);
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
