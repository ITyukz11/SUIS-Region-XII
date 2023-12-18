import { query, testDatabaseConnection } from "../../lib/db";

export default async function handler(req, res) {
  await testDatabaseConnection();

  if (req.method === "GET") {
    try {
      const ccis = await query({
        query: 'SELECT * FROM suis.ccis',
        values: [],
      });

      const prettyJSON = JSON.stringify(ccis, null, 2);

      res.status(200).send(prettyJSON);
    } catch (error) {
      console.error("Error fetching data:", error);
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
        // Dynamically add columns based on CSV file structure
        if (1===1) {
          // Your logic for dynamically creating columns here
          // For example, alter the table based on the CSV structure
          // ...

          // Now, execute the original query
          await query({
            query: sql,
            values: values,
          });

          result = { message: "Columns added and query executed successfully" };
        } else {
          // Execute the query without values
          result = await query({
            query: sql,
            values: [],  // You may need to adjust this based on your query
          });
        }
      }

      const prettyJSON = JSON.stringify(result, null, 2);
      res.status(200).send(prettyJSON);
    } catch (error) {
      console.error("Error executing query:", error);
      console.error("Values:", values);
      res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
  }
}
