const { response } = require('express')
const express = require('express')

const app = express()

app.get('/', (req, resp) => {
  return resp.json({
    message: "Hello World com nodemon!"
  })
})

app.listen(3000)
