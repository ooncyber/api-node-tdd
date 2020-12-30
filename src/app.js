const consign = require('consign')
const app = require('express')();

consign({ cwd: 'src' })
  .include('./config/middleware.js')
  .then('./routes')
  .then('./config/routes.js')
  .into(app)

app.get('/', (req, res) => {
  res.status(200).send();
})

module.exports = app;