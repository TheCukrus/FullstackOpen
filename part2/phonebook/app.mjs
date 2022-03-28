import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();


const func1 = (req, res) =>
{
    const result1 = fs.readFileSync("./FullstackOpen/part2/phonebook/db.json", "utf-8");
    const parsed = JSON.parse(result1);
    res.json(parsed);
    res.end();
}

app.use(cors());

app.get("/api/persons", func1);

app.listen(3001, "127.0.0.1");