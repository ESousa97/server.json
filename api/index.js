const app = require('./app');
const cardlist = require('./cardlist');
const categories = require('./categories');
const procedure = require('./procedure');
const search = require('./search');

// Roteamento
app.use('/api/cardlist', cardlist);
app.use('/api/categories', categories);
app.use('/api/procedure', procedure);
app.use('/api/search', search);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
