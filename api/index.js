const { app } = require('./app');
const cardlistHandler = require('./cardlist');
const categoriesHandler = require('./categories');
const procedureHandler = require('./procedure');
const searchHandler = require('./search');

const PORT = process.env.PORT || 3000;

// Rotas
app.get('/api/cardlist', cardlistHandler);
app.get('/api/categories', categoriesHandler);
app.get('/api/procedure', procedureHandler);
app.get('/api/search', searchHandler);

// Rota raiz para teste
app.get('/', (req, res) => {
  res.json({ 
    message: 'EsDataBase API funcionando!',
    endpoints: [
      '/api/cardlist',
      '/api/categories', 
      '/api/procedure?id=1',
      '/api/search?query=termo'
    ]
  });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});
