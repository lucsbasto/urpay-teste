const _ = require('lodash')
const UserTime = require('./usersTime')
const User = UserTime.user
const TimeCard = UserTime.timeCard



//Função de listar os erros do bd
const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({errors})
}

// INICIO DOS METODOS DE CLIENTE
const listUsers= (req, res, next) =>{
    User.find((erro, users) => {
        if (erro) {
            return sendErrorsFromDB(res, err)
        } else {
            return res.send({users})
        }
    })
}

const findUser = (req, res, next)=>{
    const documento = req.params.id
    console.log(documento)
    User.findOne({documento}, (erro, user)=>{
        if(erro){
            console.log("ta aq")
            return sendErrorsFromDB(res, erro)
        }
        else{
            return res.status(200).send({user: user})
        }
    })
}


const createUser = (req, res, next) => {
    const id = req.body.id
    const nome = req.body.nome.toLowerCase() || ''
    const documento = req.body.documento || ''

    User.findOne({documento}, (erro, user) => {
        if (erro) {
            return sendErrorsFromDB(res, erro)
        } else if (user) {
            return res.status(400).send({errors: ['Usuário ja cadastrado']})
        } else {
            const newUser = new User({id, nome, documento})
            newUser.save(err => {
                if (err) {
                    return sendErrorsFromDB(res, err)
                } else {
                    return res.status(200).send({message: ['Usuário criado com sucesso!']})
                }
            })
        }
    })
}

const updateUser = (req, res, next) => {
    const documento = req.params.id
    console.log('doc', documento)
    const nome = req.body.nome
    const doc = req.body.documento
    if(nome && doc){
        User.findOneAndUpdate({documento: documento}, {$set: {documento: doc, nome: nome}},(erro, user) =>{
            if(erro){
                return sendErrorsFromDB(res, err)
            }
            else{
                return res.status(201).send({'message':'usuario alterado'} )
            }})
    }
    else{
        return res.status(400).send({ erros: "Os campos de nome e documento devem ser preechidos!" })
    }
}

const deleteUser = (req, res, next) =>{
    const doc = req.params.id
    User.findOneAndDelete({documento: doc}, (erro) =>{
        if(erro){
            return sendErrorsFromDB(res, erro)
        }
        else{
            return res.status(200).send({ message: ['usuário deletado com sucesso!'] })
        }
    })
}
//FIM DOS METODOS DE CLIENTE

//INICIO DOS METODOS DE TIMECARD

const listTimeCardUser = (req, res, next) =>{
    const id = req.params.id
    TimeCard.find({user_id: id}, (erro, timeCard)=>{
        if(erro){
            return sendErrorsFromDB(res, erro)
        }
        else{
            return res.status(200).send({timeCard: timeCard})
        }
    })
}

const add_timeCard = (req, res, next) =>{
    const id = req.params.id
    User.findOne({_id: id}, (erro, user)=>{
        if(erro){
            res.send({'message':'usuario não existe'})
            return sendErrorsFromDB(res, erro)
        }
        else{
            TimeCard.find({user_id: id}, (erro, timeCard)=>{
                if(erro){
                    res.send({'message':'Erro: ', erro})
                }
                else{

                    var type = '';
                    if(timeCard[timeCard.length-1].tipo === ('SAIDA') || timeCard.length === 0 ){
                        type = 'ENTRADA'
                    }
                    else{
                        type = 'SAIDA'
                    }
                    console.log(timeCard.length)
                    const newTC = new TimeCard({user_id: id, tipo: type})
                    newTC.save((err => {
                        if (err) {
                            return sendErrorsFromDB(res, err)
                        } else {
                            return res.status(200).send({message: ['TimeCard criado com sucesso!']})
                        }
                    }))
                }
            })
        }
    })
}
//FINAL DOS METODOS DE TIME CARD

module.exports = {listUsers, createUser, findUser, updateUser, deleteUser, listTimeCardUser, add_timeCard}
