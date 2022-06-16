const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(express.json())

const customers = []


app.post('/account', (req, resp) => {

  const {name, cpf} = req.body

  const customerAlreadyExists = customers.some(customer => customer.cpf === cpf)

  if(customerAlreadyExists) {
    return resp.status(400).json({error: 'Customer already exists!'})
  }

  customers.push({
    id: uuidv4(),
    name,
    cpf,
    statement: []
  })

  return resp.status(201).send(customers)

})

app.get('/statement/:cpf', (req, resp) => {

  const { cpf } = req.params
  const client = customers.find(customer => customer.cpf === parseInt(cpf))

  if(!client) {
    return resp.status(400).json({error: 'Customer not exists!'})
  }

  return resp.send(customers.statement)

})



app.listen(3000)
