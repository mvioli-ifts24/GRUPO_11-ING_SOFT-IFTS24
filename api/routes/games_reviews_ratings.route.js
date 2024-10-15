const express = require('express')
const controller = require('#controllers/games_reviews.controller.js')

const gamesReviewsRatingsRoutesGroup = express.Router()

gamesReviewsRatingsRoutesGroup.get('/', controller.index)

module.exports = gamesReviewsRatingsRoutesGroup