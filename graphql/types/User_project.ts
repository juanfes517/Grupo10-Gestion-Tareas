import { objectType } from 'nexus'
import { Project, User } from './index'

export const User_project = objectType({
  name: 'User_project',
  definition(t) {
    t.string('id') // Campo de tipo string para el id
    t.boolean('isOwner') // Campo de tipo booleano para indicar si el usuario es propietario del proyecto
    t.field('user', { // Relación con el usuario
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user_project.findUnique({
          where: {
            id: _parent.id
          }
        })
        .user() // Resuelve la relación con el usuario
      }
    })
    t.field('project', { // Relación con el proyecto
      type: Project,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user_project.findUnique({
          where: {
            id: _parent.id
          }
        })
        .project() // Resuelve la relación con el proyecto
      }
    })
  }
})
