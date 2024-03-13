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
    try {
        // Assume que 'categoria' é uma coluna na tabela 'procedure' que você quer agrupar.
        const categoriesQuery = 'SELECT DISTINCT categoria FROM procedure';
        const categoriesResult = await pool.query(categoriesQuery);

        const categories = await Promise.all(
            categoriesResult.rows.map(async (category) => {
                const proceduresQuery = 'SELECT id, titulo FROM procedure WHERE categoria = $1';
                const proceduresResult = await pool.query(proceduresQuery, [category.categoria]);

                return {
                    categoria: category.categoria,
                    topics: proceduresResult.rows.map(procedure => ({
                        id: procedure.id,
                        title: procedure.titulo,
                        // containsAnimation: ??? // Se você precisa dessa propriedade, ela deve vir da sua base de dados
                    }))
                };
            })
        );

        res.status(200).json(categories);
    } catch (error) {
        console.error('Erro ao buscar categorias e procedimentos:', error);
        res.status(500).json({ message: 'Erro ao buscar categorias e procedimentos', error: error.message });
    }
}

module.exports = handler;
