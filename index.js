"use strict";
require("make-promises-safe");

// Require NodeJs dependencies
const { readFile, writeFile } = require("fs").promises;
const { join } = require("path");

// Require third party dependencies
const polka = require("polka");
const send = require("@polka/send-type");
const bodyParser = require("body-parser");

// create application/json parser
const jsonParser = bodyParser.json();

// Json example path
const dataFile = join(__dirname, "data", "dataFile.json");
const addons = join(__dirname, "data", "addonsList.json");
const databases = join(__dirname, "data", "databaseList.json");

polka()
    .use(bodyParser.json())
    .get("/infos", async(req, res) => {
        // Read our json exemple.json
        const readJson = await readFile(dataFile);

        send(res, 200, readJson, { "Content-Type": "application/json" });
    })
    .get("/addons/:name", async(req, res) => {
        const { name } = req.params;
        // Read our json exemple.json
        const readJson = await readFile(addons);
        for (const [key, value] of Object.entries(JSON.parse(readJson))) {
            if (key === name) {
                send(res, 200, value, { "Content-Type": "application/json" });
                break;
            }
        }
    })
    .get("database/:database", async(req, res) => {
        const { name } = req.params;
        // Read our json exemple.json
        const readJson = await readFile(databases);
        for (const [key, value] of Object.entries(JSON.parse(readJson))) {
            if (key === name) {
                send(res, 200, value, { "Content-Type": "application/json" });
                break;
            }
        }
    })
    .post("/post/addon", jsonParser, async(req, res) => {
        const { body, headers: { "content-type": contentType } } = req;

        if (contentType !== "application/json") {
            console.log("wrong format");
        }

        await writeFile(join(__dirname, "data", "newAddons.json"), body);

        res.end();
    })
    .listen(1993, (err) => {
        if (err) {
            throw err;
        }
        console.log("> Running on localhost:1993");
    });
