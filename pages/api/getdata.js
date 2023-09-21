import mysql from "mysql2/promise";

export default async function handler(req,res){

    const dbconnection = await mysql.createConnection({
        host:"localhost",
        database:"sys",
        user:"root",
        password:"!Xcx5pcjaucj1234"
    });
    try {
        const query = "SELECT * FROM sys.user";
        const values =[];
        const [data] = await dbconnection.execute(query,values);
        dbconnection.end();
        
        res.status(200).json({results:data});

    } catch (error) {
        res.status(500).json({error:error.message});
    }
    // res.status(200).json({username:"yuki"});
}