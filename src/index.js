const express = require('express')

const app = express()
app.use(express.json())


app.get('/', (req, resp) => {
  return resp.json({
    message: "Hello World com nodemon!"
  })
})

app.get('/courses', (req, resp) => {
  const {page, order} = req.query
  console.log(`page => ${page}, order => ${order}`)
  return resp.json(['Curso 1', 'Curso 2', 'Curso 3'])
})

app.post('/courses', (req, resp) => {
  const body = req.body
  console.log(body)
  return resp.json(['Curso 1', 'Curso 2', 'Curso 3', 'Curso 4'])
})

app.put('/courses/:id', (req, resp) => {
  const params = req.params
  console.log(params)
  return resp.json(['Curso 6', 'Curso 2', 'Curso 3', 'Curso 4'])
})

app.patch('/courses/:id', (req, resp) => {
  return resp.json(['Curso 7', 'Curso 8', 'Curso 3', 'Curso 4'])
})

app.delete('/courses/:id', (req, resp) => {
  return resp.json(['Curso 2', 'Curso 3', 'Curso 4'])
})

app.listen(3000)
