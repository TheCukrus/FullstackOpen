import express from "express";
import cors from "cors";
import morgan from "morgan";
import model_persons from "./models/person.js";
import mongoose from "mongoose";

const app = express();

const phonebook = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const func1 = async (req, res) =>
{
    // const result1 = fs.readFileSync("./FullstackOpen/part2/phonebook/db.json", "utf-8");
    // const parsed = JSON.parse(result1);
    const temp1 = await model_persons.find()
    res.json(temp1);
    res.end();
}

const func2 = (req, res) =>
{

    const temp = `Phonebook has info for ${model_persons.length} people
 \n ${new Date()}`;
    res.write(temp);
    res.end();
}

const func3 = async (req, res) =>
{
    //sting to number
    // const temp0 = parseInt(req.params.id);
    //filtering id
    // const temp = phonebook.filter((ele) => ele.id === temp0)

    const temp2 = await model_persons.findById(req.params.id)
    console.log(temp2);
    

    res.json(temp2);
    res.end();
}

const func4 = async (req, res) =>
{

    const temp = await model_persons.remove({"_id": req.params.id})
    console.log(temp)

    res.write("deleting");
    res.end();
}

const func5 = (req, res) =>
{
    const id = Math.floor(Math.random() * 10000000);

    const newname = {
        "id": id,
        "name": req.body.name,
        "number": req.body.number
    }

    if (req.body.name === undefined)
    {
        res.statusCode = 418;
        res.write("nera vardo");
        res.end();
    }
    else if (req.body.number === undefined)
    {
        res.statusCode = 418;
        res.write("nera numerio");
        res.end();
    }
    else
    {
        for (let i = 0; i < phonebook.length; i++)
        {
            if (req.body.name === phonebook[i]["name"])
            {
                res.statusCode = 418;
                res.json({ error: "name must be unique" });
                res.end();
                return;
            }
        }
        phonebook.push(newname);
        res.write("pavyko");
        res.end();
    }
}

// const func6 = (req, res) =>
// {
//     console.log(req)
//     // temp = parseInt(req.params.id);

//     for (let i = 0; i < phonebook.length; i++)
//     {
//         if(phonebook[i].id === req.params.id)
//         {
//             phonebook[i].number = req.body.number;
//             res.write("atnaujino");
//             res.end();
//             return;
//         }
//     }
//     res.write("nerastas id");
//     res.end();
// }

//new token "morgen"
morgan.token("body", function (req, res)
{
    if (req.body === undefined)
    {
        return;
    }
    return JSON.stringify(req.body);

})


//middlewares
app.use(cors());
app.use(express.json())
app.use(express.static("./build"))
app.use(morgan(":body :method :url :status :res[content-length] - :response-time ms"))


//endpoints
app.get("/api/persons", func1);
app.get("/info", func2);
app.get("/api/persons/:id", func3);
app.delete("/api/persons/:id", func4);
app.post("/api/persons", func5);
// app.patch("/api/persons/:id", func6);


//server listening
app.listen(process.env.PORT || 80, "127.0.0.1");