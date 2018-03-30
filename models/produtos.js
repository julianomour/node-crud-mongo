/**
 * Model Produtos
 */

 var mongoose = require('mongoose');
var Schema = mongoose.Schema

var produtoSchema = new Schema({
    nome: String,
    preco: number,
    descricao: String
})  



module.exports(mongoose.model('Produto', produtoSchema))