import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost', // Replace with your DB host
  user: 'root',      // Replace with your MySQL username
  password: 'Boomboom#1212', // Replace with your MySQL password
  database: 'Shows_Movie_Reviews_', // Replace with your database name
});

console.log('Connected to MySQL database!');

export default db;
