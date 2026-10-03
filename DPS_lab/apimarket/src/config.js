// src/config.js
import mysql from 'mysql2/promise';
import 'dotenv/config';

export const pool = mysql.createPool({
  host: process.env.MYSQLHOST || mysql.railway.internal,
  user: process.env.MYSQLUSER || root,
  password: process.env.MYSQLPASSWORD || wAwuqGzDBcZVDZrtWqhBFvyyNNIuOfYu,
  database: process.env.MYSQLDATABASE || railway,
  port: process.env.MYSQLPORT || 3306,
});
