import { arg, extendType, nonNull, stringArg } from 'nexus'

// Funcion para crear un proyecto, guarda el proyecto en la base de datos
export const MutationProject = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createProject', {
      type: 'Project',
      args: {
        name: nonNull(stringArg()),
        description: nonNull(stringArg()),
        expires: nonNull(arg({ type: 'DateTime' })),
        color: nonNull(stringArg()),
        userId: nonNull(stringArg()),
      },
      // Resolver para crear un proyecto
      async resolve(_parent, args, ctx) {
        // Tipar los argumentos explícitamente
        const { name, description, expires, color, userId } = args as {
          name: string,
          description: string,
          expires: string,
          color: string,
          userId: string
        }

        // Crear un nuevo proyecto en la base de datos
        const newProject = await ctx.prisma.project.create({
          data: {
            name,
            description,
            expires: new Date(expires),
            color,
            state: 'Pendiente',
          },
        })

        // Asignar el proyecto al usuario que lo creó
        await ctx.prisma.user_project.create({
          data: {
            userId,
            projectId: newProject.id,
            isOwner: true
          }
        })

        return newProject
      }
    })

    // Funcion para actualizar el estado de un proyecto
    t.field('updateStateProject', {
      type: 'Project',
      args: {
        projectId: nonNull(stringArg()),
        state: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.project.update({
          where: {
            id: args.projectId
          },
          data: {
            state: args.state
          }
        })
      }
    })
  }
})