const { internalError } = require('./respond');

function handleError(res, error) {
  // Avoid leaking secrets; log full error server-side.
  console.error(error);

  if (error?.code === 'DB_NOT_CONFIGURED') {
    return internalError(res, 'Banco de dados não configurado. Defina DATABASE_URL/POSTGRES_URL.');
  }

  return internalError(res, 'Erro ao processar a requisição.');
}

module.exports = { handleError };
