'use strict';

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(app.server);

describe('Categories Routes', () => {
  it('GET request', async () => {
    let response = await mockRequest.get('/api/v1/categories');

    expect(response.status).toBe(200);
  });

  it('POST request', async () => {
    let newData = {
      name: 'a name',
      display_name: 'a display name',
      description: 'a description'
    };
    let response = await mockRequest.post('/api/v1/categories');

    expect(response.status).toBe(201);
  });

  it('PUT request', async () => {
    let newData = {
      name: 'book',
      display_name: 'Book',
      description: 'LOOK I AM CHANGING THE DESCRIPTION'
    };
    let response = await (await mockRequest.put(`/api/v1/categories/${newData._id}`).send(newData));

    expect(response.status).toBe(200);
  });

  it('DELETE request', async () => {
    let newData = {
      name: 'book',
      display_name: 'Book',
      description: 'LOOK I AM CHANGING THE DESCRIPTION'
    };
    let response = await mockRequest.delete(`/api/v1/categories/${newData._id}`);

    expect(response.status).toBe(200);
  });
});

describe('Products Routes', () => {
  it('GET request', async () => {
    let response = await mockRequest.get('/api/v1/products');

    expect(response.status).toBe(200);
  });

  it('POST request', async () => {
    let newData = {
      category: 'book',
      name: 'a name',
      display_name: 'a display name',
      description: 'a description'
    };
    let response = await mockRequest.post('/api/v1/products');

    expect(response.status).toBe(201);
  });

  it('PUT request', async () => {
    let newData = {
      category: 'book',
      name: 'SO CHANGED',
      display_name: 'DIFFERENT',
      description: 'look a different description'
    };
    let response = await (await mockRequest.put(`/api/v1/products/${newData._id}`).send(newData));

    expect(response.status).toBe(200);
  });

  it('DELETE request', async () => {
    let newData = {
      category: 'book',
      name: 'SO CHANGED',
      display_name: 'DIFFERENT',
      description: 'look a different description'
    };
    let response = await mockRequest.delete(`/api/v1/products/${newData._id}`);

    expect(response.status).toBe(200);
  });
});

describe('middleware', () => {
  it('gives 404 error when route does not exist', async () => {
    let response = await mockRequest.get('/sdflkjsdf');

    expect(response.status).toBe(404);
  })
})