module.exports = (app) => {
  const findAll = (req, res) => {
    app.services.user.findAll().then((e) =>
      res.status(200).json(e))
  }

  const create = async (req, res) => {
    const camposObrigatorios = ['name', 'email', 'password'];

    for (const campo of camposObrigatorios) {
      if (!req.body[campo])
        return res.status(400).send({ error: campo[0].toUpperCase() + campo.slice(1) + " é um atributo obrigatório" })
    }
    const emailJaExistente = await app.services.user.findAll({ email: req.body.email });
    console.log(emailJaExistente);

    if (emailJaExistente && emailJaExistente.length > 0)
      return res.status(400).send({ error: "Já existe um usuário com esse email" });

    const result = await app.services.user.save(req.body, '*');
    res.status(201).json(result[0])
  }

  return { findAll, create };
}