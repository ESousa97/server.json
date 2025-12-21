// Barrel export for http utilities - reduces import lines in handlers
const { applyCors } = require('./cors');
const { createHandler } = require('./createHandler');
const { handleError } = require('./handleError');
const { ok, badRequest, notFound, internalError, methodNotAllowed } = require('./respond');
const { asInt, asTrimmedString } = require('./validation');

module.exports = {
  // Handler factory
  createHandler,

  // CORS
  applyCors,

  // Error handling
  handleError,

  // Responses
  ok,
  badRequest,
  notFound,
  internalError,
  methodNotAllowed,

  // Validation
  asInt,
  asTrimmedString,
};
