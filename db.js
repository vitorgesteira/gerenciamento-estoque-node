let pg = require('pg');

require('dotenv').config();
let db = new pg.Client(process.env.PGSTR);

db.connect(function(err) {
    if(err){
        return console.error('could not connect to postgres', err)
    }
})

exports.lerProdutos = (req, res) => {
    db.query('SELECT produto.id, produto.nome_produto, produto.qtd, produto.valor, categoria.nome_categoria FROM produto INNER JOIN categoria ON produto.categoria_id = categoria.id', (error, results) =>{
        if(error){
            return console.error('error running query', error);
        }
        // res.json({produtos:results.rows})
        // res.send({usuarios:results.rows})
        res.render('allProdutos', {produtos:results.rows})
    })
}

exports.produtosDetelhes = (req, res) => {
    const id = req.params.id

    db.query('SELECT produto.nome_produto, produto.qtd, produto.valor, categoria.nome_categoria FROM produto INNER JOIN categoria ON produto.categoria_id = categoria.id WHERE produto.id = $1', [id], (error, results) => {
        if (error) {
            return console.error('error running query', error);
        }
        // res.json({produtos:results.rows})
        res.render('detalhes', {produtos:results.rows[0]})
    })
}

exports.createProdutos = (req, res) => {
    db.query('SELECT id, nome_categoria FROM categoria', (error, results) =>{
        if(error){
            return console.error('error running query', error);
        }
        
        res.render('cadastrarProduto', {categorias:results.rows})
    })
    
}

exports.lerProdutosPorCategoria = (req, res) => {
    const categoria = req.params.categoria;

    db.query('SELECT produto.id, produto.nome_produto, produto.qtd, produto.valor, categoria.nome_categoria FROM produto INNER JOIN categoria ON produto.categoria_id = categoria.id WHERE categoria_id = $1', [categoria], (error, results) => {
        if(error){
            return console.error('error running query', error);
        }
        res.json({produtos:results.rows})
    })
} //http://localhost:3000/produtos/categorias/1

exports.criarProduto = (req, res) => {
    // const { nome_produto, qtd, valor, categoria_id } = req.body
    nome_produto = String(req.body.nome_produto)
    qtd = parseInt(req.body.qtd)
    valor = Number.parseFloat(req.body.valor).toFixed(2)
    categoria_id = parseInt(req.body.categoria_id)
    console.log(req.body)
    console.log(valor)

    db.query('INSERT INTO produto (nome_produto, qtd, valor, categoria_id) VALUES ($1, $2, $3, $4)',
    [nome_produto, qtd, valor, categoria_id], (error, results) => {
        if(error){
            throw error
        }
        console.log(results)
        res.render('home')
    })
}

exports.mudarProduto = (req, res) => {
    const id =req.params.id
    // console.log('mudar '+ id)
    db.query('SELECT produto.id, produto.nome_produto, produto.qtd, produto.valor, categoria.nome_categoria FROM produto INNER JOIN categoria ON produto.categoria_id = categoria.id WHERE produto.id = $1', [id], (error, results) => {
        if(error){
            throw error
        }
        res.render('mudarProduto', {produtos:results.rows[0]})
        // res.json({produtos:results.rows[0]})
    })
}

exports.atualizarProduto = (req, res) => {
    const id = req.params.id
    console.log('atualizar '+ id);
    const { nome_produto, qtd, valor, categoria_id } = req.body;
    
    db.query(
        'UPDATE produto SET nome_produto = $1, qtd = $2, valor = $3, categoria_id = $4 WHERE id = $5',
        [nome_produto, qtd, valor, categoria_id, id],
        (error, results) => {
            if(error){
                throw error
            }
            res.send('Produto atualizado com sucesso')
        }
    )
}

exports.deletarProduto = (req, res) => {
    const id = req.params.id

    db.query('DELETE FROM produto WHERE id = $1', [id], (error, results) => {
        if(error){
            // throw error
            console.log("Erro ao deletar o produto", error)
        }
        res.send("Produto deletado com sucesso")
    })
}

exports.lerCategorias = (req, res) => {
    db.query('SELECT nome_categoria FROM categoria', (error, results) => {
        if(error){
            return console.error('error running query', error);
        }
        res.json({categorias:results.rows})
    })
}