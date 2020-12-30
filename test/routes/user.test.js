const request = require('supertest');
const app = require('../../src/app');

describe('Users', () => {

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

  test('Nao deve inserir usuario sem nome', () => {
    return request(app).post('/users').send({ email: "Walter@mail.com", password: '1234' }).then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Name é um atributo obrigatório");
    });
  });

  test('Nao deve inserir usuario sem email', () => {
    return request(app).post('/users').send({ name: "Walter", password: '1234' }).then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Email é um atributo obrigatório");
    });
  });

});
