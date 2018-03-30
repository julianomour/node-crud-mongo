/**
 * Arquivo de Server
 * 
 */
// chamada dos pacotes
 var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');

//  Indica que retornaremos dados json atraves do bodyParser()
 app.use(bodyParser.urlencoded({extended : true}))
 app.use(bodyParser.json())

//  definindo porta que será usada
 var port = process.env.port || 8000

//  instancia das rotas via express
 var router = express.Router()

//  rota de teste
 router.get('/', (req, res) => {
    res.json({ message: "Funcionou!"})
 })
// definindo padrão das rotas prefixadas com /api
 app.use('/api', router)

//  iniciando a aplicação
 app.listen(port)
 console.log(`testando as rotas na porta ${port}`)