const Author = require('../models/author')
const Book = require('../models/book')

const authors_srv = {

    async getAuthors(req) {        
        let searchOptions = {}
        if (req.query.name != null && req.query.name !== '') {    
          searchOptions.name = new RegExp(req.query.name, 'i')    // i- case insensitive.
        }
        try {
          const authors = await Author.find(searchOptions)
          return {
            authors: authors,
            searchOptions: req.query
          }
        } catch {
          return {authors: "Authors not find"}
        }
    },

    async saveAuthor(req) {
        const author = new Author({
            name: req.body.name                                   // POST request a bodyba kuldi az infot
          })
          try {
            const newAuthor = await author.save()
            return true
          } catch {
            return false
          }
    },

    async getAuthorAndBooks(req) {
        try {
            const author = await Author.findById(req.params.id)                       // url ben hozzacsapott id  (router.get('/:id'), konkretan latszik az urlben
            const books = await Book.find({ author: author.id }).limit(6).exec()
            return {
              author: author,
              booksByAuthor: books
            }
        } 
        catch {
            return "Problem has occured, unlucky..."
        }
    },

    async editAuthor(req) {
        try {    
          let author = await Author.findById(req.params.id)
          author.name = req.body.name
          await author.save()

          return  true
        } 
        catch {            
          return {
                asd: req.body,
                oke: false
            }
        }
    },

    async deleteAuthor(req) {
        let author
        try {
          author = await Author.findById(req.params.id)
          await author.remove()                             // van egy pre function, ami remove elott lefut, ott van this reference, ami erre az authorra murtat
          return true
        } 
        catch {
          if (author == null) {
            return false
          } else {
            return {msg: "author still have books", success: false}
          }
        }
    }
}


module.exports = authors_srv