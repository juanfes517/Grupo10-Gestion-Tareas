import { nonNull, extendType, stringArg } from 'nexus';

export const QueriesTask = extendType({
  type: 'Query',
  definition(t) {
    //Busca una tarea por su id
    t.field('task', {
      type: 'Task',
      args: {
        taskId: nonNull(stringArg())
      },
      async resolve(_: any, args: any, ctx: any) {
        return await ctx.prisma.task.findUnique({
          where: { id: String(args.taskId) }
        })
      }
    })

    //Busca todas las tareas de un usuario
    t.list.field('tasks', {
      type: 'Task',
      args: {
        userId: nonNull(stringArg())
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.task.findMany({
          where: {
            userId: args.userId
          }
        })
      }
    })

    //Busca todas las tareas completadas de un usuario
    t.list.field('tasks_completed', {
      type: 'Task',
      args: {
        userId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.task.findMany({
          where: {
            userId: args.userId,
            isComplete: true
          }
        })
      }
    })

    //Busca todas las tareasa sin completar de un usuario
    t.list.field('tasks_not_completed', {
      type: 'Task',
      args: {
        userId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.task.findMany({
          where: {
            userId: args.userId,
            isComplete: false
          }
        })
      }
    })

    //Busca todas la tareas de un proyecto
    t.list.field('task_of_project', {
      type: 'Task',
      args: {
        projectId: nonNull(stringArg())
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.task.findMany({
          where: {
            projectId: args.projectId
          }
        })
      }
    })
  }
})