const request = require('supertest');
const app = require('../../src/app');

test('Deve listar todos os usuarios', () => {
  return request(app).get('/users').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  })
});

test('Deve inserir um usuario com sucesso', () => {
  const email = `${Date.now()}@mail.com`;

  return request(app).post('/users').send({ name: "Walter", email, password: '1234' }).then((res) => {
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Walter")
  })
});