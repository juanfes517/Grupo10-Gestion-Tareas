import { nonNull, extendType, stringArg } from 'nexus';

export const QueriesUser = extendType({
  type: 'Query',
  definition(t) {
    //Busca un usuario por su id
    t.field('user', {
      type: 'User',
      args: {
        userId: nonNull(stringArg())
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.user.findUnique({
          where: {
            id: args.userId
          }
        })
      }
    })

    //Busca todos lo usuarios
    t.list.field('users', {
      type: 'User',
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.user.findMany()
      }
    })
  }
})