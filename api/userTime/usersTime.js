const mongoose = require('mongoose')



var userSchema = new mongoose.Schema({
    documento: { type: Number, minlength: 1 , maxlength: 11, required: [true, 'Informe o documento do usuário!']},
    nome: { type: String, required: true},
})


var timeCardSchema = new mongoose.Schema({
    user_id: {type:  mongoose.Schema.Types.ObjectId, ref: 'user'},
    data_hora: { type: Date, default: Date.now },
    tipo: {type: String, required: [true, 'Informe o tipo de ponto !'], enum:['ENTRADA', 'SAIDA']}
})

const user = mongoose.model('user', userSchema)
const timeCard = mongoose.model('timeCard', timeCardSchema)

module.exports = {user, timeCard}