export const config = {
    api: {
      responseLimit: false,
    },
  }
  
import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  // GET REQUESTS
  if (request.method === "GET") {
    try {
      const { page = 1, pageSize = 100 } = request.query; // Extract page and pageSize query parameters
      const offset = (page - 1) * pageSize; // Calculate the offset for pagination

      const result = await sql `SELECT * FROM ess_3a_sultan_kudarat`
      //   const result = await sql `SELECT * FROM ess_3a_north_cotabato
      //   LIMIT ${pageSize}
      //   OFFSET ${offset}
      // `;

      const finalData = result.rows;
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

