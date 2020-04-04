'use strict';

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(app.server);

describe('Routes work', () => {
  it('GET request', async () => {
    let response = await mockRequest.get('/categories');

    expect(JSON.stringify(response.body)).toBe(JSON.stringify([        
    {
      id: 1,
      name: 'book',
      display_name: 'Book',
      description: 'a magical doorway to a world of adventure and possibility'
    },
    {
      id: 2,
      name: 'coffee',
      display_name: 'Coffee',
      description: 'a life-giving liquid that is more pleasant to drink rather than intake by intravenous solution'
    },
    {
      name: 'mug',
      display_name: 'Mug',
      description: 'A comforting recepticle for holding various beverages to drink, but mostly for holding the coffee beverage',
      id: 3
    }
    ]));

    expect(response.status).toBe(200);
  });

  it('POST request', async () => {
    let newData = {
      name: 'a name',
      display_name: 'a display name',
      description: 'a description'
    };
    let response = await mockRequest.post('/categories');

    expect(response.status).toBe(201);
  });

  it('PUT request', async () => {
    let newData = {
      id: 1,
      name: 'book',
      display_name: 'Book',
      description: 'LOOK I AM CHANGING THE DESCRIPTION'
    };
    let response = await (await mockRequest.put('/categories/1').send(newData));

    expect(response.status).toBe(200);
  });

  it('DELETE request', async () => {
    let response = await mockRequest.delete('/categories/1');

    expect(response.status).toBe(200);
  });
});

describe('middleware', () => {
  it('gives 404 error when route does not exist', async () => {
    let response = await mockRequest.get('/sdflkjsdf');

    expect(response.status).toBe(404);
  })
})