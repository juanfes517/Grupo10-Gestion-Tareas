import { arg, extendType, nonNull, stringArg } from 'nexus'

export const MutationUserProject = extendType({
  type: 'Mutation',
  definition(t) {
    // Función para asignar usuarios a un proyecto
    t.field('assignUsers', {
      type: 'User_project',
      args: {
        projectId: nonNull(stringArg()),
        email: nonNull(stringArg())
      },
      async resolve(_parent, args, ctx) {

        // Buscar al usuario por su email en la base de datos
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: args.email
          },
        })

        // Si el usuario no existe, lanzar un error
        if (!user) {
          throw new Error(`El usuario con email: ${args.email} no fue encontrado`);
        }

        // Crear una nueva entrada en la tabla user_project para asignar al usuario al proyecto
        return await ctx.prisma.user_project.create({
          data: {
            projectId: args.projectId,
            userId: user.id,
            isOwner: false
          }
        })
      }
    })

    // Función para eliminar la asignación de un usuario a un proyecto
    t.field('deleteUserProject', {
      type: 'User_project',
      args: {
        userProjectId: nonNull(stringArg())
      },
      async resolve(_parent, args, ctx) {
        // Eliminar la entrada correspondiente en la tabla user_project
        return await ctx.prisma.user_project.delete({
          where: {
            id: args.userProjectId,
          }
        })
      }
    })
  }
})