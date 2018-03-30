/**
 * Arquivo de Server
 * 
 */

// chamada dos pacotes
 var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 var mongoose =  require('mongoose');
 var Produto = require('./app/models/produto');
 mongoose.Promise = global.Promise
//  URI do MLab
//  mongoose.connect('mongodb://juliano:crudapi@ds029496.mlab.com:29496/mongo-crud')

// conexão local ao mongodb
mongoose.connect('mongodb://localhost:27017/node-crud-mongo')

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

  //  método para listar produtos em : GET http://localhost:8000/api/produtos
 .get((req, res) => {
    Produto.find((error, produtos) => {
        if(error){
            res.send(`Ocorreu um err: ${error}`)
        }
        res.json({produtos})
    })
 })

//  Rotas que irão terminar em "/produtos/produto_id" (serve para  get, post, put e delete)
 router.route('/produtos/:produto_id')

//  selecionar produto por ID : localhost:8000/produtos/:produto_id

.get((req, res) => {
    // função para selecionar produto por id, caso não encontre ele retorna erro
    Produto.findById(req.params.produto_id, (error, produto) => {
        if(error){
            res.send(`Produto não encontrado: ${error}`)
        }
        res.json({produto})

    })
})


//  atualizar produto por ID : localhost:8000/produtos/:produto_id

.put((req, res) => {
    // função para selecionar produto por id, caso não encontre ele retorna erro
    Produto.findById(req.params.produto_id, (error, produto) => {
        if(error){
            res.send(`Produto não encontrado: ${error}`)
        }
        // altera os dados dos campos
        produto.nome = req.body.nome
        produto.preco = req.body.preco
        produto.descricao = req.body.descricao 
        
        // salva o produto com os novos dados
        produto.save((error) =>{
            if(error){
               res.send(`erro ao atualizar o produto: ${error}`)
            }         
            res.json({message: 'Produto alterado com sucesso!'})
        })

    })
})


.delete((req, res) => {
    // função para deletar produto por id, caso não encontre ele retorna erro
    Produto.remove({_id: req.params.produto_id},(error) => {
        if(error){
            res.send(`Produto não encontrado: ${error}`)
        }
        res.json({message:"Produto removido"})       
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