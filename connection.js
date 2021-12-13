const Pool = require("pg").Pool;
require('dotenv').config();

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = process.env.NODE_ENV === "production"
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
        rejectUnauthorized: false
        }
    })
    : new Pool({
        connectionString: devConfig
    });

module.exports = pool;