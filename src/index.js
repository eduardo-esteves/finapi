const { response } = require('express')
const express = require('express')

const app = express()

app.get('/', (req, resp) => {
  return resp.json({
    message: "Hello World com nodemon!"
  })
})

app.get('/courses', (req, resp) => {
  return resp.json(['Curso 1', 'Curso 2', 'Curso 3'])
})

app.post('/courses', (req, resp) => {
  return resp.json(['Curso 1', 'Curso 2', 'Curso 3', 'Curso 4'])
})

app.put('/courses/:id', (req, resp) => {
  return resp.json(['Curso 6', 'Curso 2', 'Curso 3', 'Curso 4'])
})

app.patch('/courses/:id', (req, resp) => {
  return resp.json(['Curso 7', 'Curso 8', 'Curso 3', 'Curso 4'])
})

app.delete('/courses/:id', (req, resp) => {
  return resp.json(['Curso 2', 'Curso 3', 'Curso 4'])
})

app.listen(3000)
