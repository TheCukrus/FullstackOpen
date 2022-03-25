import express from "express";

const app = new express();

app.use(express.static("./part2/phonebook/build"));

console.log("prievadas", process.env.PORT||80)
app.listen(process.env.PORT||80)
