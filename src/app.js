const consign = require('consign')
const app = require('express')();
const knex = require('knex');
const knexFile = require('../knexfile');

// TODO criar chaveamento dinâmico
app.db = knex(knexFile.test);


consign({ cwd: 'src' })
  .include('./config/middleware.js')
  .then('./routes')
  .then('./config/routes.js')
  .into(app)

app.get('/', (req, res) => {
  res.status(200).send();
})

module.exports = app;