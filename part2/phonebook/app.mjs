import express from "express";
import fs from "fs";
import cors from "cors";

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
    },
    {
        "id": 5,
        "name": "temptemp",
        "number": "1"
    }
]

const func1 = (req, res) =>
{
    // const result1 = fs.readFileSync("./FullstackOpen/part2/phonebook/db.json", "utf-8");
    // const parsed = JSON.parse(result1);
    res.json(phonebook);
    res.end();
}

const func2 = (req, res) =>
{

    const temp = `Phonebook has info for ${phonebook.length} people
 \n ${new Date()}`;
    res.write(temp);
    res.end();
}

const func3 = (req, res) =>
{
    //sting to number
    const temp0 = parseInt(req.params.id);
    //filtering id
    const temp = phonebook.filter((ele) => ele.id === temp0)

    if (temp.length === 0)
    {
        res.statusCode = 404;
        res.end();
        return
    }
    res.json(temp);
    res.end();
}

const func4 = (req, res) =>
{
    //sting to number
    const temp0 = parseInt(req.params.id);
    //filtering id
    const temp = phonebook.filter((ele) => ele.id === temp0)

    //deleting post
    phonebook.splice(temp0 - 1, 1);
    res.write("deleting")
    res.end();
}

app.use(cors());

//endpoints
app.get("/api/persons", func1);
app.get("/info", func2)
app.get("/api/persons/:id", func3)
app.delete("/api/persons/:id", func4)


//server listening
app.listen(3001, "127.0.0.1");