const express = require("express");
const cors = require("cors");

const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json());
app.use(cors());

let db;

connectToDb((err) => {
    if (!err) {
        app.listen(5000, () => {
            console.log("Server started at port 5000");
        });
        db = getDb();
    }
});

app.get("/list", (req, res) => {
    let items = [];

    db.collection("Items")
        .find()
        .sort({ name: 1 })
        .forEach((item) => items.push(item))
        .then(() => {
            res.status(200).json(items);
        })
        .catch(() => {
            res.status(500).json({ error: "Could not fetch the documents" });
        });
});

app.post("/list", (req, res) => {
    const item = req.body;

    db.collection("Items")
        .insertOne(item)
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            res.status(500).json({ error: "Could not insert the document" });
        });
});

app.delete("/list/:id", (req, res) => {
    db.collection("Items")
        .deleteOne({ _id: new ObjectId(req.params.id) })
        .then((result) => {
            res.status(202).json(result);
        })
        .catch((err) => {
            res.status(500).json({
                error: "Could not delete the document",
            });
        });
});
