const express = require('express');
const app = express();
const port = 3000;

//rotas para pegar dados
app.get('/', (req, res) => {res.send('ola ola')});

//URL e porta (socket do servidor)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})