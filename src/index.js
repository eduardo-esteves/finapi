const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(express.json())

const customers = []


app.post('/account', (req, resp) => {
  const {name, cpf} = req.body
  const id = uuidv4()
  customers.push({id, name, cpf, statement: []})


  return resp.status(201).send(customers)
})



app.listen(3000)
