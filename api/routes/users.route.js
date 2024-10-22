const express = require('express')
const controller = require('#controllers/users.controller.js')

const usersRouteGroup = express.Router()

usersRouteGroup.get('/', controller.index)
usersRouteGroup.get('/:id', controller.show)
usersRouteGroup.put('/:id', controller.update)
usersRouteGroup.delete('/:id', controller.destroy)

module.exports = usersRouteGroup