'use strict';

const supergoose = require('@code-fellows/supergoose');
const categoriesSchema = require('../lib/models/categories-schema.js');
const Model = require('../lib/models/model.js');

const categoriesModel = new Model(categoriesSchema);

beforeAll( async () => {
  await categoriesModel.create({
    name: 'book',
    display_name: 'Book',
    description: 'a magical doorway to a world of adventure and possibility'
});

  await categoriesModel.create({
    name: 'coffee',
    display_name: 'Coffee',
    description: 'a life-giving liquid that is more pleasant to drink rather than intake by intravenous solution'
  });
});

describe('Categories CRUD', () => {
  it('Can create', async () => {
    let response = await categoriesModel.create({
      name: 'thing',
      display_name: 'Thing',
      description: 'here is a description of a thing'
    });

    expect(response).not.toBeFalsy();
  });

  it('Can read by query', async () => {
    let response = await categoriesModel.readByQuery({});

    expect(response).not.toBeFalsy();
  });

  it('update a record given an ID and a change', async () => {
    let newRecord = await categoriesModel.create({
      name: 'thing',
      display_name: 'Thing',
      description: 'here is a description of a thing'
    });
    let response = await categoriesModel.update( newRecord._id, {"name": "different words"});

    expect(response).not.toBeFalsy();
  });

  it('delete a record given an ID', async () => {
    let newRecord = await categoriesModel.create({
      name: 'thing',
      display_name: 'Thing',
      description: 'here is a description of a thing'
    });
    let response = await categoriesModel.delete(newRecord._id);

    expect(response).not.toBeFalsy();
  });
})