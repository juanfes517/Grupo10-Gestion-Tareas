import { connectionPlugin, makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './types';
import * as resolvers from './resolvers'

// Creamos el esquema de GraphQL
export const schema = makeSchema({
  plugins: [connectionPlugin()],
  types: {...types, ...resolvers},
  outputs: {
    // Especificamos la ubicación del archivo de definición de tipos generados
    typegen: join(process.cwd(), 'generated/nexus-typegen.ts'),
    // Especificamos la ubicación del archivo de esquema GraphQL generado
    schema: join(process.cwd(), 'generated/schema.graphql')
  }
})