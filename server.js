import { randomUUID } from 'node:crypto'
import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'
import { sql } from './db.js'

const server = fastify()

const db = new DatabasePostgres()

server.post('/contacts', async (req, res) => {
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

server.get('/contacts', async (req, res) => {
  const {search} = req.query
  const contacts = await db.listContacts(search)
  res.send(contacts)
})

server.put('/contacts/:id',async (req, res) => {
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

server.delete('/contacts/:id',async (req, res) => {
  const {id} = req.params
  await db.deleteContact(id)
  res.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT || 3333
}).then(console.log('Server on'))