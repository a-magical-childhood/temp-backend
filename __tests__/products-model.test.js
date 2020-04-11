'use strict';

const supergoose = require('@code-fellows/supergoose');
const productsSchema = require('../lib/models/products-schema.js');
const Model = require('../lib/models/model.js');

const productsModel = new Model(productsSchema);

beforeAll( async () => {
  await productsModel.create({
    category: 'book',
    name: 'book',
    display_name: 'Book',
    description: 'stuff'
});

  await productsModel.create({
    category: 'coffee',
    name: 'coffee',
    display_name: 'Coffee',
    description: 'blah'
  });
});

describe('Categories CRUD', () => {
  it('Can create', async () => {
    let response = await productsModel.create({
      category: 'stuff',
      name: 'thing',
      display_name: 'Thing',
      description: 'here is a description of a thing'
    });

    expect(response).not.toBeFalsy();
  });

  it('Can read by query', async () => {
    let response = await productsModel.readByQuery({});

    expect(response).not.toBeFalsy();
  });

  it('update a record given an ID and a change', async () => {
    let newRecord = await productsModel.create({
      category: 'stuff',
      name: 'thing',
      display_name: 'Thing',
      description: 'here is a description of a thing'
    });
    let response = await productsModel.update( newRecord._id, {"name": "different words"});

    expect(response).not.toBeFalsy();
  });

  it('delete a record given an ID', async () => {
    let newRecord = await productsModel.create({
      category: 'stuff',
      name: 'thing',
      display_name: 'Thing',
      description: 'here is a description of a thing'
    });
    let response = await productsModel.delete(newRecord._id);

    expect(response).not.toBeFalsy();
  });
})