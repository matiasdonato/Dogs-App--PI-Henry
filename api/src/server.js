let express = require('express');
let dogsMiddlew = require("./routes/dogs.js")
let tempsMiddlew = require("./routes/temps.js")
let cors = require("cors");

let server = express();

server.use(express.json());

server.use(cors());

server.use('/dogs', dogsMiddlew);
server.use('/temperaments', tempsMiddlew);

server.get("/", (req, res) => {
    res.send("HOLAAAAA")
});


module.exports = server;