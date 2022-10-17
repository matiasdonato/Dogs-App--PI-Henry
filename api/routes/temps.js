let { Router } = require("express");
let router = Router();
let { Temper } = require("../db/index.js");
let axios = require("axios")


router.get("/", async(req, res) => {
    let temps = await Temper.findAll();
    if (temps.length === 0) {
        let newTemps = []
        let breeds = await axios.get("https://api.thedogapi.com/v1/breeds")
        breeds.data.map(b => {
            if (b.temperament) {
                let temper = b.temperament
                let tempers = temper.split(", ")
                tempers.map(t => newTemps.includes(t) ? null : newTemps.push(t));
            }
        })
        newTemps.sort()
        let tempsArray = newTemps.map(t => Temper.create({ name: t }))
        await Promise.all(tempsArray)
        let actualTemps = await Temper.findAll();
        return res.json(actualTemps)
    }
    res.send(temps)
})

module.exports = router;