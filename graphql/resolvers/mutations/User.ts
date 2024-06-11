import { arg, booleanArg, extendType, nonNull, stringArg } from 'nexus'

// Definición de la función 'updateRole'
export const MutationUser = extendType({
  type: 'Mutation',
  definition(t) {

    t.field('updateRole', {
      type: 'User',
      args: {
        userId: nonNull(stringArg()), // Argumento obligatorio que representa el ID del usuario
        role: nonNull(stringArg()), // Argumento obligatorio que representa el nuevo rol del usuario
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.user.update({
          where: {
            id: args.userId,
          },
          data: {
            role: args.role
          }
        })
      }
    })
  }
})