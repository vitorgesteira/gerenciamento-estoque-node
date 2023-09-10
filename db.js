let pg = require('pg');

require('dotenv').config();
let db = new pg.Client(process.env.PGSTR);

db.connect(function(err) {
    if(err){
        return console.error('could not connect to postgres', err)
    }
})

exports.lerProdutos = (req, res) => {
    db.query('SELECT produto.nome_produto, produto.qtd, produto.valor, categoria.nome_categoria FROM produto INNER JOIN categoria ON produto.categoria_id = categoria.id', (error, results) =>{
        if(error){
            return console.error('error running query', err);
        }
        res.json({produtos:results.rows})
        // res.send({usuarios:results.rows})
    })
}

exports.lerProdutosPorCategoria = (req, res) => {
    const categoria = req.params.categoria;

    db.query('SELECT produto.nome_produto, produto.qtd, produto.valor, categoria.nome_categoria FROM produto INNER JOIN categoria ON produto.categoria_id = categoria.id WHERE categoria_id = $1', [categoria], (error, results) => {
        if(error){
            return console.error('error running query', error);
        }
        res.json({produtos:results.rows})
    })
} //http://localhost:3000/produtos/categorias/1