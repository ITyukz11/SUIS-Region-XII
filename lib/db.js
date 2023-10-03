// db.js
import { Pool } from "pg";

let conn;

if (!conn) {
  conn = new Pool({
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    host: process.env.PGSQL_HOST,
    port: process.env.PGSQL_PORT,
    database: process.env.PGSQL_DATABASE,
  });
}

export default conn;


// Add a function to test the database connection
export async function testDatabaseConnection() {
  try {
    const client = await conn.connect();
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error("Error connecting to PostgreSQL database:", error);
  }
}

export async function query({ query, values = [] }) {
  try {
    const result = await conn.query(query, values);
    console.log("query result: ", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw new Error(`Caught Error: ${error.message}\nQuery: ${query}\nValues: ${values.join(', ')}`);
  }
}