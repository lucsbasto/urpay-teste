const express = require('express')
const usersService = require('../api/userTime/usersService')

module.exports = function(server){
    const api = express.Router()
    server.use('/users', api)
    api.get('/', usersService.listUsers)
    api.post('/', usersService.createUser)
    api.get('/:id', usersService.findUser)
    api.put('/:id', usersService.updateUser)
    api.delete('/:id', usersService.deleteUser)

    api.get('/:id/timecard', usersService.listTimeCardUser)
    api.post('/:id/timecard', usersService.add_timeCard)
}
