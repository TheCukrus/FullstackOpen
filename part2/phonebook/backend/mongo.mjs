const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
console.log("args", process.argv)
import mongoose from "mongoose";

const schema_persons = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true }
})

const model_persons = mongoose.connections[0].model("person", schema_persons)

let mongodb_url = "mongodb+srv://cluster0.f2drs.mongodb.net/db2";


try
{
    await mongoose.connect(mongodb_url, { user: "Zenia", pass: "Zenia", authSource: "admin" });

    if (process.argv.length === 3)
    {
        const find_user = await model_persons.find()
        console.log("phonebook:")

        for (let i = 0; i < model_persons.length; i++)
        {
            console.log((find_user[i].name), (find_user[i].number))
        }
    }
    else if (process.argv.length === 5)
    {
        const create_user = await model_persons.create({
            "name": name,
            "number": number
        })
        console.log(create_user)
        console.log(`added ${create_user.name} number ${create_user.number} to phonebook`)
    }



    await mongoose.disconnect()
}
catch (err)
{
    console.log(err);
}



