import { nonNull, extendType, stringArg } from 'nexus'

export const QueriesProject = extendType({
  type: 'Query',
  definition(t) {
    // Busca un proyecto por su id
    t.field('project', {
      type: 'Project',
      args: {
        projectId: nonNull(stringArg())
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.project.findUnique({
          where: { id: args.projectId }
        })
      }
    })
  },
})
