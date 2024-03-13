const fs = require('fs');
const { Pool } = require('pg');

// Lê o arquivo db.json
const db = JSON.parse(fs.readFileSync('db.json', 'utf8'));

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
    const { id } = req.params; // Use `req.params` para obter o `id` dos parâmetros da rota, não `req.query`

    try {
        const { rows } = await pool.query(
            'SELECT * FROM procedure WHERE id = $1', // Garanta que o nome da tabela está correto
            [id] // Passa `id` diretamente como um parâmetro
        );

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ error: 'Procedimento não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar o procedimento:', error);
        res.status(500).json({ message: 'Erro ao consultar o banco de dados', error: error.message });
    }
}

module.exports = handler;
