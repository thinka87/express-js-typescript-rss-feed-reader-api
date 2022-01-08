const express = require('express')
const router = express.Router()
const rssFeedController=require('../controllers/rssFeedController')

// define the home page route
router.get('/getFeedByURL', rssFeedController.getRssFeedByURL)
router.get('/getMP3IDTagInfo', rssFeedController.getID3TagInfo)

module.exports = router