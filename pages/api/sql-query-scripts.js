// pages/api/test-db-connection.js

import { query, testDatabaseConnection } from "../../lib/db";

export default async function handler(req, res) {
  await testDatabaseConnection();

  if (req.method === "GET") {
    try {
        try {
          const query_scripts = await query({
            query: 'SELECT * FROM suis.sql_query_scripts',
            values: [],
          });

          // Use JSON.stringify with null and a number (e.g., 2) for indentation
          const prettyJSON = JSON.stringify(query_scripts, null, 2);

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
    console.log("SQL AND VALUES: ", sql, values); // Log to check the values

    let result;

    // Ensure that `sql` is defined before calling the `query` function
    if (sql) {
      // Execute the query without values
      result = await query({
        query: sql,
        values: values || [], // Ensure values is an array
      });
    } else {
      throw new Error("SQL query is undefined.");
    }

    const prettyJSON = JSON.stringify(result, null, 2);
    res.status(200).send(prettyJSON); // Send the pretty-printed JSON as a response
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error("Error executing query:", error);
    console.error("Values:", values);
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
}

  
}
