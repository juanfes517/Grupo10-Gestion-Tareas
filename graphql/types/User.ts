import {nullable, objectType } from 'nexus'

// Definición del objeto User
export const User = objectType({
  name: 'User',
  definition(t) {
    // Campo 'id' de tipo string
    t.string('id')
    // Campo 'name' opcional de tipo string
    t.nullable.string('name')
    // Campo 'email' opcional de tipo string
    t.nullable.string('email')
    // Campo 'image' opcional de tipo string
    t.nullable.string('image')
    // Campo 'createdAt' opcional de tipo date
    t.nullable.date('createdAt')
    // Campo 'role' opcional de tipo string
    t.nullable.string('role')
  }
})