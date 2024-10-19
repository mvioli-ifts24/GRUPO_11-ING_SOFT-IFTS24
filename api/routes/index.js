const express = require('express')
const gamesReviewsRoutesGroup = require('./games_reviews.route')
const gamesReviewsRatingsRoutesGroup = require('./games_reviews_ratings.route')
const contactMessagesRoutesGroup = require('./contact_messages.route')
const gamesNewsRoutesGroup = require('./games_news.route')
const authRoutesGroup = require('./auth.route')
const authMiddleware = require('#middlewares/auth.middleware.js')

const router = express.Router()

const rootRouter = router
.use('/auth', authRoutesGroup)
.use('', authMiddleware)
.use('/games_reviews', gamesReviewsRoutesGroup)
.use('/games_reviews_ratings', gamesReviewsRatingsRoutesGroup)
.use('/contact_messages', contactMessagesRoutesGroup)
.use('/games_news', gamesNewsRoutesGroup)

module.exports = rootRouter