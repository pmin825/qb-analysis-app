const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");
require("dotenv").config();

if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"));
    app.get("/", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "frontend", "build", "index.html")
        );
    });
}

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/", (req, res) => {
    res.send("QB STATS APP");
});

app.get("/qbs", async (req, res) => {
    const apiKey = process.env.API_KEY;
    try {
        const response = await axios.get(
            "https://project.trumedianetworks.com/api/token",
            {
                headers: {
                    accept: "application/json",
                    apiKey: process.env.API_KEY,
                },
            }
        );
        if (response) {
            const token = response.data.token;
            const qbList = await axios.get(
                "https://project.trumedianetworks.com/api/nfl/players",
                {
                    headers: {
                        accept: "application/json",
                        tempToken: token,
                    },
                }
            );
            res.send(qbList.data);
        }
    } catch (error) {
        res.status(404).json(error.message);
    }
});

app.get("/:id", async (req, res) => {
    const apiKey = process.env.API_KEY;
    try {
        const response = await axios.get(
            "https://project.trumedianetworks.com/api/token",
            {
                headers: {
                    accept: "application/json",
                    apiKey: process.env.API_KEY,
                },
            }
        );
        if (response) {
            const token = response.data.token;
            const qbId = req.params.id;
            const qbStats = await axios.get(
                `https://project.trumedianetworks.com/api/nfl/player/${qbId}`,
                {
                    headers: {
                        accept: "application/json",
                        tempToken: token,
                    },
                }
            );
            res.send(qbStats.data);
        }
    } catch (error) {
        res.status(404).json(error.message);
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is listening on https://localhost:${port}`);
});
