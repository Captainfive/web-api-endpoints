"use strict";
require("make-promises-safe");

// Require NodeJs dependencies
const { readFile, writeFile } = require("fs").promises;
const { join } = require("path");

// Require third party dependencies
const polka = require("polka");
const bodyParser = require("body-parser");

// create application/json parser
const jsonParser = bodyParser.json();

// Json example path
const jsonExample = join(__dirname, "data", "addons.json");

polka()
    .use(bodyParser.json())
    .get("/addons", async(req, res) => {
        // Read our json exemple.json
        const readJson = await readFile(jsonExample);

        res.end(readJson);
    })
    .get("/addons/:name", async(req, res) => {
        const { name } = req.params;
        console.log(name);
        // Read our json exemple.json
        const readJson = await readFile(jsonExample);
        console.log(readJson);

        res.end(JSON.parse(readJson));
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
