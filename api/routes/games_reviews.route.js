const express = require('express')
const controller = require('#controllers/games_reviews.controller.js')

const gamesReviewsRoutesGroup = express.Router()

gamesReviewsRoutesGroup.get('/', controller.index)
gamesReviewsRoutesGroup.get('/:id', controller.show)
gamesReviewsRoutesGroup.post('/', controller.store)
gamesReviewsRoutesGroup.put('/:id', controller.update)
gamesReviewsRoutesGroup.delete('/:id', controller.destroy)

module.exports = gamesReviewsRoutesGroup