import { nonNull, extendType, stringArg } from 'nexus'

export const QueriesUserProject = extendType({
  type: 'Query',
  definition(t) {
    // Busca todos los proyectos de un usuario
    t.list.field('all_projects_of_a_user', {
      type: 'User_project',
      args: {
        userId: nonNull(stringArg())
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.user_project.findMany({
          where: {
            userId: args.userId
          }
        })
      }
    })

    // Busca todos los usuarios de un proyecto
    t.list.field('all_users_of_a_project', {
      type: 'User_project',
      args: {
        projectId: nonNull(stringArg())
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.user_project.findMany({
          where: {
            projectId: args.projectId
          }
        })
      }
    })
  },
})
