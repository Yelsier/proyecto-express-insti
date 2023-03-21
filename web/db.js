const { Client } = require("pg")

const db = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

db.connect().catch(err => console.log("Error al conectar a la base de datos", err))

module.exports = db