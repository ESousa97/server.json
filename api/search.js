const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path'); // Importar o módulo path

const app = express();

// Middleware para desabilitar o CORS
app.use(cors());

// Caminho absoluto para o arquivo db.json
const dbPath = path.resolve(__dirname, '../db.json');

// Lê o arquivo db.json
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Configuração do pool de conexão com o banco de dados
const pool = new Pool({
  connectionString: 'postgres://default:srE4lQaZ1oGy@ep-calm-field-a4v1frtu-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
});

// Rota para a busca
app.get('/api/search', async (req, res) => {
    const { query } = req.query; // Use 'query' para corresponder ao termo usado no frontend
    if (!query) {
        return res.status(400).json({ error: 'Termo de busca não fornecido' });
    }

    try {
        const searchTerms = `%${query}%`;
        const result = await pool.query(db.queries.searchProcedure.sql, [searchTerms]);
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
    }
});

module.exports = app;
