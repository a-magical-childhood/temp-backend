'use strict';

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(app.server);

describe('Categories Routes', () => {
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

describe('Products Routes', () => {
  it('GET request', async () => {
    let response = await mockRequest.get('/products');

    expect(JSON.stringify(response.body)).toBe(JSON.stringify([        
      {
        "id": 1,
        "category": "book",
        "name": "milk_and_vine",
        "display_name": "Milk and Vine: Inspirational Quotes From Classic Vines",
        "description": "Parodying the popular poetry book Milk and Honey, Milk and Vine beautifully portrays the best vines of all time in this modern poetic format. Milk and Vine is truly a delight for the sensations, bringing back the riveting quotes we all laughed at together as a united internet community."
      },
      {
        "id": 2,
        "category": "coffee",
        "name": "death_wish",
        "display_name": "Death Wish Coffee Beans",
        "description": "Death Wish Coffee, the world’s strongest coffee, is crafted with carefully selected, perfectly roasted coffee beans to produce a dark, bold, highly caffeinated coffee blend. Our coffee has double the strength of your average cup of coffee without being bitter or acidic. Be on the top of your game every day with the clarity and focus that comes with a strong cup of coffee."
      }
    ]));

    expect(response.status).toBe(200);
  });

  it('POST request', async () => {
    let newData = {
      category: 'book',
      name: 'a name',
      display_name: 'a display name',
      description: 'a description'
    };
    let response = await mockRequest.post('/products');

    expect(response.status).toBe(201);
  });

  it('PUT request', async () => {
    let newData = {
      category: 'book',
      name: 'SO CHANGED',
      display_name: 'DIFFERENT',
      description: 'look a different description'
    };
    let response = await (await mockRequest.put('/products/1').send(newData));

    expect(response.status).toBe(200);
  });

  it('DELETE request', async () => {
    let response = await mockRequest.delete('/products/1');

    expect(response.status).toBe(200);
  });
});

describe('middleware', () => {
  it('gives 404 error when route does not exist', async () => {
    let response = await mockRequest.get('/sdflkjsdf');

    expect(response.status).toBe(404);
  })
})