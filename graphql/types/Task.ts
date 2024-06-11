import { DateTimeResolver } from 'graphql-scalars';
import { asNexusMethod, objectType } from 'nexus';
import { Project } from './index'

export const GQLDate = asNexusMethod(DateTimeResolver, 'date'); //Nos permite usar tipos de fechas

// Definición del tipo Task
export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.string('id'); // Identificador de la tarea
    t.string('name'); // Nombre de la tarea
    t.string('description'); // Descripción de la tarea
    t.string('state'); // Estado de la tarea
    t.boolean('isPersonal'); // Indica si la tarea es personal o no
    t.date('createdAt'); // Fecha de creación de la tarea
    t.nullable.date('expires'); // Fecha de vencimiento de la tarea (opcional)
    t.nullable.date('completedAt'); // Fecha de finalización de la tarea (opcional)
    t.field('responsible', { // Responsable de la tarea
      type: 'User',
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.task
          .findUnique({
            where: { id: _parent.id }
          })
          .responsible();
      }
    })
    t.nullable.field('project', { // Proyecto al que pertenece la tarea (opcional)
      type: Project,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.task
          .findUnique({
            where: { id: _parent.id }
          })
          .project()
      }
    })
  }
});
