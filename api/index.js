const { app } = require('./app');
const cardlistHandler = require('./cardlist');
const categoriesHandler = require('./categories');
const procedureHandler = require('./procedure');
const searchHandler = require('./search');

const PORT = process.env.PORT || 3000;

// Rotas (compatibilidade + paridade com Vercel rewrites)
app.all('/api/cardlist', cardlistHandler); // legacy
app.all('/api/cards', cardlistHandler); // Vercel rewrite

app.all('/api/categories', categoriesHandler);

app.all('/api/procedure', procedureHandler); // legacy (?id=)
app.all('/api/procedure/:id', (req, res) => {
  req.query.id = req.params.id;
  return procedureHandler(req, res);
});

app.all('/api/search', searchHandler);

// Rota raiz para teste
app.get('/', (req, res) => {
  res.json({
    message: 'EsDataBase API funcionando!',
    endpoints: [
      '/api/cardlist',
      '/api/categories',
      '/api/procedure?id=1',
      '/api/search?query=termo',
    ],
  });
});

// Inicia o servidor (somente execução local)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
  });
}

module.exports = app;
