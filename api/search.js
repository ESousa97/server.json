const fs = require('fs');
const { Pool } = require('pg');

// Lê o arquivo db.json
const db = JSON.parse(fs.readFileSync('db.json', 'utf8'));

// Configuração do pool de conexão com o banco de dados
const pool = new Pool({
  user: 'default',
  host: 'postgres://default:srE4lQaZ1oGy@ep-calm-field-a4v1frtu-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
  database: 'verceldb',
  password: 'srE4lQaZ1oGy',
  port: 5432,
});

async function searchHandler(req, res) {
    const { query } = req.query; // Use 'query' para corresponder ao termo usado no frontend
    if (!query) {
        return res.status(400).json({ error: 'Termo de busca não fornecido' });
    }

    try {
        const searchTerms = `%${query}%`;
        const result = await pool.query(db.searchQuery, [searchTerms]);
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
    }
}

module.exports = searchHandler;
