const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(express.json())

const customers = []


// Middleware
function verifyIfExistsAccountCPF(req, resp, next) {

  const { cpf } = req.headers
  const customer = customers.find(customer => customer.cpf === parseInt(cpf))

  if(!customer) {
    return resp.status(400).json({error: 'Customer not exists!'})
  }

  // Repassando o customer para todas as rotas que invocarem este middleware.
  req.customer = customer

  return next()

}


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

// app.use(verifyIfExistsAccountCPF)

app.get('/statement', verifyIfExistsAccountCPF, (req, resp) => {

  const { customer } = req
  return resp.send(customer.statement)

})



app.listen(3000)
