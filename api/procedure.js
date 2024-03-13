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

async function handler(req, res) {
    const { id } = req.params; // Use `req.params` para obter o `id` dos parâmetros da rota, não `req.query`

    try {
        const { sql } = db.getProcedureById;
        const { rows } = await pool.query(sql, [id]); // Executa a consulta usando o SQL da chave `getProcedureById`
        
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

// Middleware para desabilitar o CORS
function enableCORS(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}

// Adicionando middleware de CORS à aplicação
app.use(enableCORS);

module.exports = handler;
