const path = require('path');

// Keep SQL definitions in db.json so Vercel can include a single file
// and we avoid duplicating queries across handlers.
const queriesFile = require(path.join(__dirname, '..', '..', 'db.json'));

const queries = queriesFile?.queries ?? {};

function getQuery(name) {
  const entry = queries[name];
  if (!entry?.sql) {
    const available = Object.keys(queries).sort();
    const hint = available.length ? ` Available: ${available.join(', ')}` : '';
    const error = new Error(`Unknown SQL query: ${name}.${hint}`);
    error.code = 'QUERY_NOT_FOUND';
    throw error;
  }
  return entry.sql;
}

module.exports = { getQuery };
