const express = require('express');
const db = require('./db');
const app = express();
const bodyParser = require('body-parser')
var cors = require('cors')  

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(cors())

//rotas para pegar dados
app.get('/', (req, res) => res.render('home'));
app.get('/produtos', (req, res) => db.lerProdutos(req, res));
app.get('/produtos/detalhes/:id', (req, res) => db.produtosDetelhes(req, res));

// app.get('/produtos/categorias/:categoria', (req, res) => db.lerProdutosPorCategoria(req, res));
app.put('/teste-axios', (req, res) => {
  res.json({mensagem: 'funcionou'});
});

//api interface para mostrar formulario do front
app.get('/cadastrarProduto', (req, res) => db.createProdutos(req, res));
app.get('/produtos/atualizar/:id', (req, res) => db.mudarProduto(req, res));

//rotas para atulizar dados
app.post('/produtos', (req, res) => db.criarProduto(req, res));

app.put('/produtos/:id', (req, res) => db.atualizarProduto(req, res));
app.delete('/produtos/:id', (req, re) => db.desletarProduto(req, res));

//URL e porta (socket do servidor)
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
  })
