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
            return console.error('error running query', err);
        }
        res.json({produtos:results.rows})
        // res.send({usuarios:results.rows})
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
    const { nome_produto, qtd, valor, categoria_id } = req.body

    db.query('INSERT INTO produto (nome_produto, qtd, valor, categoria_id) VALUES ($1, $2, $3, $4)',
    [nome_produto, qtd, valor, categoria_id], (error, results) => {
        if(error){
            throw error
        }
        res.json({produto:{nome_produto, qtd, valor, categoria_id}})
    })
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