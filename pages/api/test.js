import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
    if (request.method === "GET") {
        const pets = await sql`SELECT * FROM Pets;`;
        const data = pets.rows
        return response.status(200).json({ data });
      }
      
//   try {
//     const petName = request.query.petName;
//     const ownerName = request.query.ownerName;
//     if (!petName || !ownerName) throw new Error('Pet and owner names required');
//     await sql`INSERT INTO Pets (Name, Owner) VALUES (${petName}, ${ownerName});`;
//   } catch (error) {
//     return response.status(500).json({ error });
//   }
 

}