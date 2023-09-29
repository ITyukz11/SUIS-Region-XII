import { query } from "../../../../lib/db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
          const essNorthCot = await query({
            query: "SELECT * FROM `ess_3a_north_cotabato` ORDER BY `Collective CLOA Sequence Number` DESC",
            values: [],
          });
          res.status(200).json(essNorthCot);
        } catch (error) {
          console.error("Error fetching data:", error);
          res.status(500).json({ error: "Internal Server Error: " + error.message });
        }
      }
      

    if (req.method === "POST") {
    
        const {sql:sql, values:values} = req.body;
        console.log("POST SQL QUERY: ",sql)

    try {
      const insertData = await query({
        query: sql,
        values: values
      });
  
      if (insertData.affectedRows > 0) {
        res.status(201).json({ message: "Success" });
      } else {
        res.status(500).json({ error: "Failed to insert data" });
      }
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
  }
  

}
  

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '10mb',
      },
    },
  }