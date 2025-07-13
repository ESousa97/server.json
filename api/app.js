const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware para desabilitar o CORS
app.use(cors());

// Configuração do pool de conexão com PostgreSQL local
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:123456@localhost:5432/esdatabase',
  ssl: false // Para PostgreSQL local, SSL deve ser false
});

// Função para testar a conexão com o banco de dados
async function connectToDatabase() {
  try {
    // Obtém um cliente do pool de conexões
    const client = await pool.connect();
    console.log('Conectado ao banco de dados PostgreSQL local');
    
    // Executa uma query simples para testar a conexão
    const result = await client.query('SELECT NOW()');
    console.log('Conexão bem-sucedida. Data e hora atuais do banco de dados:', result.rows[0].now);
    
    // Libera o cliente de volta ao pool
    client.release();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
  }
}

connectToDatabase();

// Exporta o pool para uso em outros arquivos
module.exports = { app, pool };
