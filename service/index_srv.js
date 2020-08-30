const Book = require('../models/book')

// ez igy nem annyira praktikus mert kell egy instance...

// export class IndexSRV {

//     async getBooks() {
//         let books 
//         try {
//           books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
//         } catch {
//           books = []
//         }
//         // res.render('index', { books: books })
//         books. forEach(book => book.coverImage = 0)     // just dont want to see a hell of a string...
//         return books
//       }
// }

// inkabb csinalok egy objectet, es azt exportalom
const index_srv = {

        async getBooks() {
        let books 
        try {
          books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
        } catch {
          books = []
        }
        books. forEach(book => book.coverImage = 0)     // just dont want to see a hell of a string...
        return books
      }
}

module.exports = index_srv