// Barrel export for database utilities
const { getPool, query } = require('./client');
const { getQuery } = require('./queries');

module.exports = {
  getPool,
  query,
  getQuery,
};
