const express = require('express')
const gamesReviewsRoutesGroup = require('./games_reviews.route')
const gamesReviewsRatingsRoutesGroup = require('./games_reviews_ratings.route')

const router = express.Router()

const rootRouter = router.use('/games_reviews', gamesReviewsRoutesGroup).use('/games_reviews_ratings', gamesReviewsRatingsRoutesGroup)

module.exports = rootRouter