const express = require('express');
const rssFeedroutes =require('./src/routes/rssFeedRoutes')
const notFound=require('./src/middlewares/notFound')
var path = require('path')

const app = express()
const PORT = 4000

app.use('/rssFeed', rssFeedroutes)
app.use(notFound)

app.listen(PORT, () => 
    console.log(`Your server is running on port ${PORT}`)
);