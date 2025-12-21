const express = require('express');
const cors = require('cors');
const { loadEnv } = require('../src/config/env');

loadEnv();

const app = express();

// Middleware CORS (para server local). Em produção (Vercel Functions), os handlers já aplicam CORS.
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'OPTIONS'],
  })
);

module.exports = { app };
