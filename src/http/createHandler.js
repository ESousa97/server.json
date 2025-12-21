const { applyCors } = require('./cors');
const { handleError } = require('./handleError');
const { methodNotAllowed } = require('./respond');

/**
 * Creates a standardized GET-only handler with CORS, method validation, and error handling.
 * Reduces boilerplate across all API endpoints.
 *
 * @param {Function} fn - Async function (req, res) => Promise<void>
 * @returns {Function} Express/Vercel-compatible handler
 */
function createHandler(fn) {
  return async function handler(req, res) {
    if (applyCors(req, res)) return;
    if (req.method !== 'GET') return methodNotAllowed(res);

    try {
      return await fn(req, res);
    } catch (error) {
      return handleError(res, error);
    }
  };
}

module.exports = { createHandler };
