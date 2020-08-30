const express = require('express')
const router = express.Router()
const i_srv = require('../service/index_srv')

router.get('/', async (req, res) => {
  const books = await i_srv.getBooks()
  res.json(books);
})

module.exports = router