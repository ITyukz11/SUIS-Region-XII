// pages/api/test-db-connection.js

import { testDatabaseConnection } from "../../../../lib/db";
import { query } from "../../../../lib/db"; // Import your query function

export default async function handler(req, res) {
  await testDatabaseConnection();

  if (req.method === "GET") {
    try {
        try {
          const essNorthCot = await query({
            query: 'SELECT * FROM suis.ess_3b_north_cotabato',
            values: [],
          });

          // Use JSON.stringify with null and a number (e.g., 2) for indentation
          const prettyJSON = JSON.stringify(essNorthCot, null, 2);

          res.status(200).send(prettyJSON); // Send the pretty-printed JSON as a response
        } catch (error) {
          console.error("Error fetching data:", error);
          res.status(500).json({ error: "Internal Server Error: " + error.message });
        }

    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
  }

  if (req.method === "POST") {
    const { sql, values } = req.body;

    try {
      let result;

      if (values == []) {
        // Execute the query with values
        await query({
          query: sql,
          values: values,
        });

        result = { message: "Success" };
      } else {
        // Execute the query without values
        result = await query({
          query: sql,
          values: [],  // You may need to adjust this based on your query
        });
      }

      const prettyJSON = JSON.stringify(result, null, 2);
      res.status(200).send(prettyJSON); // Send the pretty-printed JSON as a response
    } catch (error) {
      console.error("Error executing query:", error);
      console.error("Values:", values);
      res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
  }
  
  
}
