import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

export const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

db.getConnection()
    .then(() => console.log("Conexão com o banco bem-sucedida!!!"))
    .catch(err => console.log("Erro ao conectar ao banco: ", err));