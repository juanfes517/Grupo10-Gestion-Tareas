import { arg, booleanArg, extendType, nonNull, stringArg } from 'nexus'

export const MutationTask = extendType({
  type: 'Mutation',
  definition(t) {
    // Definición de la función 'createTask'
    t.field('createTask', {
      type: 'Task',
      args: {
        name: nonNull(stringArg()), // Argumento obligatorio: nombre de la tarea
        description: nonNull(stringArg()), // Argumento obligatorio: descripción de la tarea
        email: nonNull(stringArg()), // Argumento obligatorio: correo electrónico del usuario
        projectId: nonNull(stringArg()), // Argumento obligatorio: ID del proyecto
        expires: nonNull('DateTime'), // Argumento obligatorio: fecha de vencimiento de la tarea
        isPersonal: nonNull(booleanArg()) // Argumento obligatorio: indicador de si la tarea es personal o no
      },
      async resolve(_parent, { name, description, email, expires, isPersonal, projectId }: any, ctx) {

        // Buscar al usuario por su correo electrónico
        const user = await ctx.prisma.user.findUnique({
          where: {
            email
          }
        })

        // Si el usuario no existe, retornar null
        if (user == null){
          return null
        }

        // Crear una nueva tarea en la base de datos
        const newTask = await ctx.prisma.task.create({
          data: {
            name,
            description,
            expires,
            userId: user.id,
            isPersonal,
            state: 'Pendiente',
            projectId
          },
        })
        return newTask;
      }
    })

    // Definición de la función 'deleteTask'
    t.field('deleteTask', {
      type: 'Task',
      args: {
        taskId: nonNull(stringArg()), // Argumento obligatorio: ID de la tarea a eliminar
      },
      async resolve(_parent, args, ctx) {
        // Eliminar la tarea de la base de datos
        return await ctx.prisma.task.delete({
          where: {
            id: args.taskId
          },
        })
      }
    })

    // Definición de la función 'updateState'
    t.field('updateState', {
      type: 'Task',
      args: {
        taskId: nonNull(stringArg()), // Argumento obligatorio: ID de la tarea a actualizar
        state: nonNull(stringArg()), // Argumento obligatorio: nuevo estado de la tarea
      },
      async resolve(_parent, args, ctx) {
        // Actualizar el estado de la tarea en la base de datos
        return await ctx.prisma.task.update({
          where: {
            id: args.taskId
          },
          data: {
            state: args.state
          }
        })
      }
    })
  }
})