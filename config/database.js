const mongoose = require('mongoose')

const database = mongoose.connect('mongodb://localhost/teste_urpay', { useNewUrlParser: true })

mongoose.connection.on('disconnected', ()=>{
    console.log("desconectado")
})

mongoose.connection.on('connected', ()=>{
    console.log("aplicação conectada !")
})

module.exports = database;
