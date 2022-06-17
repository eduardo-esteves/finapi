const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(express.json())

const customers = []


/**
 * Middleware que faz a validação se o cliente existe, em caso afirmativo prossegue
 * a execução da requisição original repassando uma nova propriedade customer que
 * pode ser interceptada pela rota que a executou.
 */
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

// Cria uma conta com informações basicas
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

// Retorna o extrato bancário de um cliente existente
app.get('/statement', verifyIfExistsAccountCPF, (req, resp) => {

  const { customer } = req
  return resp.send(customer.statement)

})

// Insere uma transação bancaria a um cliente existente
app.post('/deposit', verifyIfExistsAccountCPF, (req, resp) => {

  const { customer } = req
  const { description, amount } = req.body

  customer.statement.push({
    description,
    amount,
    created_at: new Date(),
    type: 'credit'
  })

  return resp.status(201).send(customer)

})

// Retorna o extrato bancário de um cliente existente em uma determinada data
app.get('/statement/by_date', verifyIfExistsAccountCPF, (req, resp) => {

  const { customer } = req
  const { date } = req.query

  const dateFormat = new Date(date + ' 00:00')

  debugger

  const statement = customer.statement.filter(stat => stat.created_at.toDateString() === new Date(dateFormat).toDateString())

  if(statement.length <= 0) {
    return resp.status(400).json({error: 'Any statement find!'})
  }

  return resp.send(statement)

})


app.listen(3000)
