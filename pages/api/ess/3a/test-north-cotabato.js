import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  // GET REQUESTS
  if (request.method === "GET") {
    try {
      const ess_3a_north_cotabato = await sql`SELECT * FROM ess_3a_north_cotabato`;
      const finalData = ess_3a_north_cotabato.rows;
      return response.status(200).json(finalData);
    } catch (error) {
      console.error("Error fetching data:", error);
      response.status(500).json({ error: "Internal Server Error: " + error.message });
    }
  }

  // POST REQUESTS
  if (request.method === "POST") {
    const { sql: query, values } = request.body; // Extract SQL query and values from the request body
    
    try {
      // Execute the SQL query with the provided values
      const result = await sql.query(query, values);

      // If no error is thrown, consider the operation successful
      response.status(201).json({ message: "Success", result });
    } catch (error) {
      console.error("Error inserting data:", error);
      console.error("Query:", query);
      console.error("Values:", values);
      response.status(500).json({ error: "Internal Server Error: " + error.message });
    }
  } else {
    response.status(405).json({ error: "Method Not Allowed" });
  }
}

export const config = {
    api: {
      responseLimit: false,
    },
  }