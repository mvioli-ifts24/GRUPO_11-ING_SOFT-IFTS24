const express = require('express')
const controller = require('#controllers/auth.controller.js')

const authRoutesGroup = express.Router()

authRoutesGroup.post('/register', controller.register)
authRoutesGroup.post('/login', controller.login)

module.exports = authRoutesGroup