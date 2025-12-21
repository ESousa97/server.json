function ok(res, body) {
  res.status(200).json(body);
}

function badRequest(res, message, details) {
  res.status(400).json({ error: { code: 'BAD_REQUEST', message, details } });
}

function notFound(res, message) {
  res.status(404).json({ error: { code: 'NOT_FOUND', message } });
}

function internalError(res, message) {
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message } });
}

function methodNotAllowed(res) {
  res.status(405).json({ error: { code: 'METHOD_NOT_ALLOWED', message: 'Método não suportado.' } });
}

module.exports = { ok, badRequest, notFound, internalError, methodNotAllowed };
