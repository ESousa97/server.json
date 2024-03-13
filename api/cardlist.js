const { Pool } = require('pg');

// Configuração do pool de conexão com o banco de dados
const pool = new Pool({
  user: 'default',
  host: 'postgres://default:srE4lQaZ1oGy@ep-calm-field-a4v1frtu-pooler.us-east-1.aws.neon.tech',
  database: 'verceldb',
  password: 'srE4lQaZ1oGy',
  port: 5432,
  ssl: {
    rejectUnauthorized: false // Certifique-se de que essa opção esteja configurada corretamente para o seu ambiente
  }
});

async function handler(req, res) {
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
