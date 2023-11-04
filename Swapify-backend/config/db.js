import dotenv from 'dotenv';
import { createConnection } from 'mysql';
dotenv.config();


// db declaration for production vs. development
const db = process.env.NODE_ENV === 'production' ? createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
}) : createConnection({
    host: "localhost",
    user: "root",
    password: "191090465",
    database: "Swapify",
    port: 7999,
})

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to", db.config.database, "db");
});

export default db;