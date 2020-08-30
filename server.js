if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
  
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')                              // @RequestBody, ahhoz kell hogy server tudjon fogadni endpontjain adott pojot. post, vagy put ban
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

const app = express()
// app.use(methodOverride('_method'))                                      // a formokrol majd "_method" elojelzessel kell jelezni hogy PUT, DELETE request.
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))      // use bodyparser, + multipart file korlatozas.
app.use(bodyParser.json());                                                // use json body parser !!!

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3000)