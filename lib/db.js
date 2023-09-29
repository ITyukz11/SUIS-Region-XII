import mysql from 'mysql2/promise';


const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: 50,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});


export async function query({ query, values = [] }) {
  try {
    const [results] = await pool.execute(query, values);
    console.log("results: ", results);
    return results;
  } catch (error) {
    throw new Error("Caught Error: " + error.message); // Fix the error message format and remove dbconnection.end()
  }
}


