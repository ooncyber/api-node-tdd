const request = require('supertest');
const app = require('../../src/app');

const email = `${Date.now()}@mail.com`;

describe('Users', () => {

  test('Deve listar todos os usuarios', () => {
    return request(app).get('/users').then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    })
  });

  test('Deve inserir um usuario com sucesso', () => {

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

  test('Nao deve inserir usuario sem email', async () => {
    const resultado = await request(app).post('/users').send({ name: "Walter", password: '1234' })
    expect(resultado.status).toBe(400);
    expect(resultado.body.error).toBe("Email é um atributo obrigatório");


  });
  test('Nao deve inserir usuario sem password', async (done) => {
    const resultado = await request(app).post('/users').send({ name: "Walter", email: "mail@gmail.com" })
    expect(resultado.status).toBe(400);
    expect(resultado.body.error).toBe("Password é um atributo obrigatório");
    done();
  });

  test('Nao deve inserir usuario com email já existente', async () => {
    const resultado = await request(app).post('/users').send({ name: "Walter", email: "walter@gmail.com", password: '1234' })
    expect(resultado.status).toBe(400);
    expect(resultado.body.error).toBe("Já existe um usuário com esse email")

  });

});
