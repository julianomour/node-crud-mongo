/**
 * Arquivo de Server
 * 
 */

// chamada dos pacotes
 var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 var mongoose =  require('mongoose');
 var Produto = require('./app/models/produtos');
//  URI do MLab
 mongoose.connect('mongodb://juliano:crudapi@ds029496.mlab.com:29496/mongo-crud')


//  Indica que retornaremos dados json atraves do bodyParser()
 app.use(bodyParser.urlencoded({extended : true}))
 app.use(bodyParser.json())

//  definindo porta que será usada
 var port = process.env.port || 8000

//  instancia das rotas via express
 var router = express.Router()


 router.route('/produtos')

//  método para criar produtos em : POST http://localhost:8000/api/produtos
 .post((req, res) => {
     var produto = new Produto()
     produto.nome = req.body.nome
     produto.preco = req.body.preco
     produto.descricao = req.body.descricao

     produto.save((error) =>{
         if(error){
            res.send(`erro ocorrido: ${error}`)
         }         
         res.json({message: 'Produto cadastrado'})
    })
  })
 

 router.use((req, res, next) => {
    console.log('executando algo aqui ...')
    next()
})

//  rota de teste
 router.get('/', (req, res) => {
    res.json({ message: "Funcionou!"})
 })



// definindo padrão das rotas prefixadas com /api
 app.use('/api', router)

//  iniciando a aplicação
 app.listen(port)
 console.log(`testando as rotas na porta ${port}`)