import { knexConfig, knexConfig2 } from './knexConfig.js'
import crearKnex from 'knex'

export const clienteSQL = crearKnex(knexConfig)
export const clienteSQLite = crearKnex(knexConfig2);