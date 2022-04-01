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
   
}
catch (err)
{
    console.log(err);
}




export default model_persons;