const axios = require('axios');
//PUT UM

axios.put('localhost:3000/teste-axios')
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });
