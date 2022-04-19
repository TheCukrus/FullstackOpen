import mongoose from "mongoose";


const url = 'mongodb+srv://cluster0.f2drs.mongodb.net/db3';
const connection = mongoose.createConnection(url, { user: "Zenia", pass: "Zenia", authSource: "admin" });


const disconnect = async () =>
{
    try
    {
        const result1 = await connection.close()
    }
    catch (err)
    {
        console.log(`klaida db1 ${err}`)
    }
}

const drop_db = async () =>
{
    try
    {
        const result1 = await connection.dropDatabase()
    }
    catch (err)
    {
        console.log(`klaida db1 drop_db ${err}`)
    }
}



export default { drop_db, disconnect, connection };