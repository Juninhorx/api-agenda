import { sql } from "./db.js"

export class DatabasePostgres {

  //Veriica Email
  async verifyEmail(email){
    const usuarios = (await sql`SELECT * FROM users WHERE email=${email}`).count
    return usuarios
  }

  //Verifica Senha
  async checkPassword(email, password) {
    const bdPass = await sql`SELECT senha FROM users WHERE email=${email}`
    const bdPassTreated = bdPass[0].senha
    if (password != bdPassTreated) {
      return false
    }
    return true
  }

  //Criar contato
  async createContact(contact) {
    await sql`INSERT INTO Contacts (id, name, email, phone) VALUES (${contact.contactId}, ${contact.name}, ${contact.email}, ${contact.phone});
    `
  }

  //Listar contatos
  async listContacts(search = '') {
    let contacts
    if (search) {
      contacts = await sql`SELECT * FROM Contacts WHERE name ilike ${'%' + search + '%'}`
    } else {
      contacts = await sql`SELECT * FROM Contacts`
    }
    return contacts
  }

  //Atualizar contato
  async updateContact(id, contact) {
    await sql`UPDATE Contacts SET name=${contact.name}, email=${contact.email}, phone=${contact.phone} WHERE id=${id}`
  }

  //Deleta contato
  async deleteContact(id) {
    await sql`DELETE FROM Contacts WHERE id=${id}`
  }
}