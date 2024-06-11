import { DateTimeResolver } from 'graphql-scalars';
import { asNexusMethod, nonNull, nullable, objectType, stringArg } from 'nexus';

// const GQLDate = asNexusMethod(DateTimeResolver, 'date'); //Nos permite usar tipos de fechas

// Definición del tipo Project
export const Project = objectType({
  name: 'Project',
  definition(t) {
    t.string('id');
    t.string('name')
    t.string('description')
    t.string('state')
    t.string('color')
    t.date('createdAt')
    t.nullable.date('expires')
    t.nullable.date('completedAt')
  }
});