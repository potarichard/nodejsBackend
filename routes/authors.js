const express = require('express')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')
const authors_srv = require('../service/authors_srv')

// szami a requestek sorrendje, mert a server top -> bottom nezi a matching urleket a requestre es ha pl. lat egy ilyet hogy router.get('/new'), router.get('/:id'),
//  akkor ha router.get('/:id' lenne elobb akkor lehet olyan eset h /authors/new, es nezi hogy aha, az id az "new" es az alapjan megy tovabb, ez nagyon edge case de lehetnek ilyenk.

// All Authors Route
router.get('/', async (req, res) => {
  const response = await authors_srv.getAuthors(req)
  res.json(response)
})


// Create Author Route
router.post('/', async (req, res) => {
  if(authors_srv.saveAuthor(req))
    res.json("Happy")
  else
    res.json("Sad")
})

// get author and all books of it
router.get('/:id', async (req, res) => {
  const response = await authors_srv.getAuthorAndBooks(req);
  res.json(response)
})


// edit the euthor
router.put('/:id', async (req, res) => {                              // from browser you can only do get and post request,  PUT, DELETE request no, need to install method override
  const succsess = await authors_srv.editAuthor(req)
  res.json(succsess)
})

router.delete('/:id', async (req, res) => {
  const response = await authors_srv.deleteAuthor(req)
  res.json(response)
})

module.exports = router