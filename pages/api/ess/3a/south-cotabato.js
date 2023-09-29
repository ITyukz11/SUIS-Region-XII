import { query } from "../../../../lib/db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
          const essSouthCot = await query({
            query: "SELECT * FROM `ess_3a_south_cotabato` ORDER BY `Collective CLOA Sequence Number` DESC",
            values: [],
          });
          res.status(200).json(essSouthCot);
        } catch (error) {
          console.error("Error fetching data:", error);
          res.status(500).json({ error: "Internal Server Error: " + error.message });
        }
      }
      

    if (req.method === "POST") {
        // const {
        //     "start": startDate,
        //     "end": endDate,
        //     "today": todayDate,
        //     "username": username,
        //     "phonenumber": phoneNumber,
        //     "audit": auditInfo,
        //     "audit_URL": auditUrl,
        //     "Collective CLOA Sequence Number": cloaNumber,
        //     "OCT/TCT Number": octTctNumber,
        //     "Collective CLOA Number": colCloaNumber,
        //     "First Name": firstName,
        //     "Middle Name": middleName,
        //     "Last Name": lastName,
        //     "Actual area of tillage/cultivation (in square meters)": area,
        //     "Gender": gender,
        //     "Educational Attainment": education,
        //     "Civil Status": civilStatus
        // } = req.body;
        const {sql:sql, values:values} = req.body;
        console.log("POST SQL QUERY: ",sql)

    try {
      const insertData = await query({
        query: sql,
        values: values
       // query: "INSERT INTO suis.`sample ess 3a sc` (`start`, `end`, `today`, `username`, `phonenumber`, `audit`, `audit_URL`, `Collective CLOA Sequence Number`, `OCT/TCT Number`,`Collective CLOA Number`,`First Name`, `Middle Name`, `Last Name`,`Actual area of tillage/cultivation (in square meters)`,  `Gender`,  `Educational Attainment`, `Civil Status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        //values: [startDate, endDate, todayDate, username, phoneNumber, auditInfo, auditUrl,cloaNumber,octTctNumber,colCloaNumber, firstName, middleName, lastName, area,  gender,   education, civilStatus]
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