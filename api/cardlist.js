const { createHandler, ok } = require('../src/http');
const { query, getQuery } = require('../src/db');

module.exports = createHandler(async (req, res) => {
  const { rows } = await query(getQuery('getAllCards'), []);
  return ok(res, rows);
});
