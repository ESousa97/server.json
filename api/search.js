const { Pool } = require('pg');

// Configuração do pool de conexão com o banco de dados
const pool = new Pool({
  connectionString: 'postgres://default:srE4lQaZ1oGy@ep-calm-field-a4v1frtu-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
  ssl: {
    rejectUnauthorized: false // Certifique-se de que essa opção esteja configurada corretamente para o seu ambiente
  }
});

async function handler(req, res) {
    try {
        // Realize a consulta ao banco de dados para fazer a busca
        const { query } = req.query; // Use 'query' para corresponder ao termo usado no frontend
        if (!query) {
            return res.status(400).json({ error: 'Termo de busca não fornecido' });
        }

        const searchTerms = `%${query}%`;
        const result = await pool.query('SELECT * FROM procedure WHERE content ILIKE $1 ORDER BY similarity(content, $1) DESC LIMIT 10', [searchTerms]);

        // Retorne os resultados da busca obtidos da consulta ao banco de dados
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        // Em caso de erro na consulta ao banco de dados, retorne um erro 500
        res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
    }
}

module.exports = handler;
