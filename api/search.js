const { createHandler, ok, badRequest, asTrimmedString } = require('../src/http');
const { query, getQuery } = require('../src/db');

module.exports = createHandler(async (req, res) => {
  const q = asTrimmedString(req.query.query, { min: 1, max: 100 });
  if (!q) return badRequest(res, 'Termo de busca não fornecido ou inválido');

  const searchTerms = `%${q}%`;

  try {
    const result = await query(getQuery('searchProcedure'), [searchTerms]);
    return ok(res, result.rows);
  } catch (error) {
    // Fallback: environments without pg_trgm/similarity()
    const isSimilarityMissing =
      error?.code === '42883' || /similarity\s*\(/i.test(String(error?.message || ''));

    if (!isSimilarityMissing) throw error;

    const fallbackSql = 'SELECT * FROM procedure WHERE conteudo ILIKE $1 ORDER BY id DESC LIMIT 10';
    const fallback = await query(fallbackSql, [searchTerms]);
    return ok(res, fallback.rows);
  }
});
