module.exports = (app) => {
  const findAll = (filter = {}) => app.db('users').where(filter).select();
  const save = (user) => app.db('users').insert(user, '*')

  return { findAll, save }
}