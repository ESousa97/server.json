const { createHandler, ok, badRequest, notFound, asInt } = require('../src/http');
const { query, getQuery } = require('../src/db');

module.exports = createHandler(async (req, res) => {
  const id = asInt(req.query.id);
  if (!id) return badRequest(res, 'ID do procedimento não fornecido ou inválido');

  const { rows } = await query(getQuery('getProcedureById'), [id]);

  if (rows.length === 0) {
    return notFound(res, 'Procedimento não encontrado');
  }

  return ok(res, rows[0]);
});
