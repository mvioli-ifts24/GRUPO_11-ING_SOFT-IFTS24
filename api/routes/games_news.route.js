const express = require('express')
const controller = require('#controllers/games_news.controller.js')

const gamesNewsRoutesGroup = express.Router()

gamesNewsRoutesGroup.get('/', controller.index)
gamesNewsRoutesGroup.get('/:id', controller.show)
gamesNewsRoutesGroup.post('/', controller.store)
gamesNewsRoutesGroup.put('/:id', controller.update)
gamesNewsRoutesGroup.patch('/:id', controller.disable)
gamesNewsRoutesGroup.delete('/:id', controller.destroy)

module.exports = gamesNewsRoutesGroup