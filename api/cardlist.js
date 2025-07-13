const { Pool } = require('pg');
require('dotenv').config();

// Configuração do pool de conexão com o banco de dados
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:123456@localhost:5432/esdatabase',
  ssl: false // Para PostgreSQL local
});

async function handler(req, res) {
  // Configuração dos cabeçalhos de CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Realize a consulta ao banco de dados para obter todos os cartões
    const { rows } = await pool.query('SELECT * FROM cards;');
    
    // Retorne os cartões obtidos da consulta ao banco de dados
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar dados dos cards:', error);
    // Em caso de erro na consulta ao banco de dados, retorne um erro 500
    res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
  }
}

module.exports = handler;
