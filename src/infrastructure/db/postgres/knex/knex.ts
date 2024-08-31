import knex, { Knex } from "knex";
const config = require("../../../../../knexfile.js");

const environment = process.env.ENVIRONMENT || 'development';
export const knexPool: Knex = knex(config[environment]);