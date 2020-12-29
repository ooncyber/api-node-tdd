const supertest = require('supertest');

const request = supertest('http://localhost:3001');

test('Deve responder a porta 3001', () => {
  // accessar url http://localhost:3001
  return request.get('/').then(e => expect(e.status).toBe(200));

  // verificar que a resposta foi 200
});