const fs = require('fs');
const { Pool } = require('pg');
const express = require('express');
const app = express();

// Lê o arquivo db.json
const db = JSON.parse(fs.readFileSync('db.json', 'utf8'));

// Configuração do pool de conexão com o banco de dados
const pool = new Pool({
  connectionString: 'postgres://default:srE4lQaZ1oGy@ep-calm-field-a4v1frtu-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
  ssl: {
    rejectUnauthorized: false // Certifique-se de que essa opção esteja configurada corretamente para o seu ambiente
  }
});

// Middleware para desabilitar o CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

async function handler(req, res) {
    try {
        // Obter dados de categorias e procedimentos do db.json
        const categoriesAndProcedures = db.queries.getAllCategoriesAndProcedures;

        // Executar consulta para cada categoria
        const categories = await Promise.all(
            categoriesAndProcedures.map(async (category) => {
                // Obtendo a categoria da propriedade categoria do objeto
                const categoryName = category.categoria;

                // Executando a consulta para obter os procedimentos da categoria
                const proceduresQuery = 'SELECT id, titulo FROM procedure WHERE categoria = $1';
                const proceduresResult = await pool.query(proceduresQuery, [categoryName]);

                // Mapeando os procedimentos para o formato esperado
                return {
                    categoria: categoryName,
                    topics: proceduresResult.rows.map(procedure => ({
                        id: procedure.id,
                        title: procedure.titulo,
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

// Rota para manipular a solicitação
app.get('/api/categories', handler);

module.exports = handler;
