import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const { query: rawQuery } = req.query;
    const sqlQuery = decodeURIComponent(rawQuery);

    const results = await query({ query: sqlQuery }); 
    res.status(200).json(results);
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
