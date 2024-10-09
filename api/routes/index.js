const express = require('express')
const gamesReviewsRoutesGroup = require('./games_reviews.route')

const router = express.Router()

const rootRouter = router.use('/games_reviews', gamesReviewsRoutesGroup)

module.exports = rootRouter