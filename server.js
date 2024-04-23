import { randomUUID } from 'node:crypto'
import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'
import { sql } from './db.js'
import jwt from 'jsonwebtoken'

const server = fastify()

const db = new DatabasePostgres()

server.post('/login', async (req, res) => {
  const {email, password} = req.body
  console.log(email, password)
  const emailExists = await db.verifyEmail(email)
  if (!emailExists) {
    return res.status(404).send('Email não encontrado')
  }
  const passMatches = await db.checkPassword(email, password)

  if (!passMatches) {
    return res.status(401).send('Credenciais inválidas')
  }
  
  const token = jwt.sign({email: email}, process.env.SECRET, {expiresIn: 300})
  return res.status(200).send({
    token
  })
})

server.post('/contacts', async (req, res) => {

  const token = req.headers.authorization
  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      console.log(token)
      res.status(401).send('Não autorizado, faça o login.')
    }
    const {name, email, phone} = req.body
    const contactExists = (await sql`SELECT * FROM Contacts
    WHERE name ILIKE ${name} OR email ILIKE ${email} OR phone ILIKE ${phone};`).count
  
    if (contactExists) {
      //ERRO
      throw new Error('Já existe um contato com algum dos dados informados.')
    } else {
      //Cria Contato
  
      const contactId = randomUUID()
      const contact = {
        contactId,
        name,
        email,
        phone,
      }
      
      await db.createContact(contact)
    }
    res.status(201).send()
  })

}) 

server.get('/contacts', (req, res) => {
  const token = req.headers.authorization
  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      console.log(token)
      res.status(401).send('Não autorizado')
    }
    const {search} = req.query
    const contacts = await db.listContacts(search)
    res.status(201).send({
      decoded,
      contacts
    })
  })
})

server.put('/contacts/:id',async (req, res) => {
  const token = req.headers.authorization
  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      console.log(token)
      res.status(401).send('Não autorizado, faça o login.')
    }

    const {id} = req.params
    const newContactData = req.body
    const isIdValid = (await sql`SELECT name FROM Contacts WHERE id=${id}`).count
  
    if (!isIdValid) {
      throw new Error('Id informado inválido.')
    }else {
      await db.updateContact(id, newContactData)
    }
  
    res.status(201).send()

  })
})

server.delete('/contacts/:id',async (req, res) => {

  const token = req.headers.authorization
  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      console.log(token)
      res.status(401).send('Não autorizado')
    }
      const {id} = req.params
      const isIdValid = (await sql`SELECT name FROM Contacts WHERE id=${id}`).count
    
      if (!isIdValid) {
        throw new Error('Id informado inválido.')
      }else {
        await db.deleteContact(id)
      }
      res.status(204).send()
  })
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT || 3333
}).then(console.log('Server on'))