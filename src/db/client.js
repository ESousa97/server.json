const { Pool } = require('pg');
const { loadEnv } = require('../config/env');

loadEnv();

let pool;

function isTruthy(value) {
  return value === '1' || value === 'true' || value === 'yes';
}

function resolveConnectionString() {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_PRISMA_URL
  );
}

function resolveSsl() {
  // Local development: allow explicit opt-out.
  if (isTruthy(process.env.PGSSL_DISABLE) || process.env.PGSSLMODE === 'disable') {
    return false;
  }

  // Vercel/managed Postgres typically requires SSL.
  if (process.env.VERCEL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING) {
    return { rejectUnauthorized: false };
  }

  // Default: no SSL unless explicitly enabled.
  return false;
}

function getPool() {
  if (pool) return pool;

  const connectionString = resolveConnectionString();
  if (!connectionString) {
    const error = new Error(
      'Database connection string not configured. Set DATABASE_URL (local) or POSTGRES_URL (Vercel).'
    );
    error.code = 'DB_NOT_CONFIGURED';
    throw error;
  }

  pool = new Pool({
    connectionString,
    ssl: resolveSsl(),
    max: Number(process.env.PGPOOL_MAX || 10),
    idleTimeoutMillis: Number(process.env.PGPOOL_IDLE_TIMEOUT_MS || 30000),
    connectionTimeoutMillis: Number(process.env.PGPOOL_CONN_TIMEOUT_MS || 2000),
  });

  return pool;
}

async function query(text, params) {
  const activePool = getPool();
  return activePool.query(text, params);
}

module.exports = { getPool, query };
