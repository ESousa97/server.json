let loaded = false;

function loadEnv() {
  if (loaded) return;
  loaded = true;

  // In serverless/production, environment variables are provided by the platform.
  // Loading .env is useful for local development.
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    require('dotenv').config();
  }
}

module.exports = { loadEnv };
