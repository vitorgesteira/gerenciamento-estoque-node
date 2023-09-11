const express = require('express');
const db = require('./db');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

//rotas para pegar dados
app.get('/', (req, res) => {res.send('ola')});
app.get('/produtos', (req, res) => db.lerProdutos(req, res));
app.get('/produtos/categorias/:categoria', (req, res) => db.lerProdutosPorCategoria(req, res));

//rotas para atulizar dados
app.post('/produtos', (req, res) => db.criarProduto(req, res));

//URL e porta (socket do servidor)
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })