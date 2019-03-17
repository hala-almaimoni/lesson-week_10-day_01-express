const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const port = 3000
const myMiddleWare = (req, res, next) => {
    console.log("testing my first middlware")
    next()
}
const myMiddleWare2 = (req, res, next) => {
    console.log("testing my second middlware")
    next()
}
app.use(myMiddleWare)
app.use(myMiddleWare2)

const books = [
    { title: 'Dictionary', author: 'Webster' }, // 0
    { title: 'Encyclopedia', author: 'Encarta' }, // 1
    { title: 'Clean Code', author: 'Robert Cecil Martin' } // 2
  ]
app.get('/books', (req, res) => res.json({books: books}))
app.get('/books/:id', (req, res) => res.json({book: books[req.params.id]}))
app.delete('/books/:id', (req, res) => {
    let id = req.params.id
    books.splice(id, 1)
    res.send(204)
} )
app.post('/books', (req, res) => {
    const book = req.body.book
    books.push(book)
    res.status(201).json({book: book})
})
app.put('/books/:id', (req, res) => {
    let id = req.params.id
    const book = req.body.book
    books[id] = book
    res.status(201).json({books: books})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))