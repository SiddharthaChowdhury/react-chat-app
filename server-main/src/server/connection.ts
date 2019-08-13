import mysql from 'mysql';

export const conn = mysql.createConnection({
    host     : 'localhost',
    user     : process.env.sql_user,
    password : process.env.sql_pass,
    database : process.env.sql_db
});
