"use strict";

const polka = require("polka");
const bodyParser = require("body-parser");

// create application/json parser
const jsonParser = bodyParser.json();

/**
 * @async
 * @function main
 * @returns {Promise<void>}
 */
async function main() {
    polka()
        .get("/users", (req, res) => {
            console.log(`Hello`);
            res.end(`User: ${req.params.id}`);
        })
        .post("/users/post", jsonParser, (req, res) => {
            console.log(req.body);
        })
        .listen(1337, (err) => {
            if (err) {
                throw err;
            }
            console.log("> Running on localhost:1337");
        });
}
main().catch(console.error);
