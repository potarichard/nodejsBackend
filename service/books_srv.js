const Book = require('../models/book')
const Author = require('../models/author')

const books_srv = {
    async getBooks(req) {
        let query = Book.find()             // queryt modositgatjuk majd de kell egy sema, gondolom valmi alap sema jellegut ad a Book.find(), csak felepitunk egy queryt es kesobb executoljuk
                                            // nem csak az osszes bookot akarjuk latni, hanem keresni is akarunk pl nev alapjan, na ezek szuresehez kell itt felepiteni  a queryt
        if (req.query.title != null && req.query.title != '') {
            query = query.regex('title', new RegExp(req.query.title, 'i'))    // turn into case insensitive
        }
        if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
            query = query.lte('publishDate', req.query.publishedBefore)       // less than or equal to the date, gte greater than...
        }
        if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
            query = query.gte('publishDate', req.query.publishedAfter)        // req.query.publishedAfter  ezek mind az urlbol jonnek
        }
        try {
            const books = await query.exec()
            return {         
                books: books,
                searchOptions: req.query
            }
        } 
        catch {
            return false
        }
    }

}

module.exports = books_srv