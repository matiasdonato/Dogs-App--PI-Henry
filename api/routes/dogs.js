let { Router } = require("express");
const { Op } = require("sequelize");
let router = Router();
let { Breed, Temper } = require("../db/index.js");
let upload = require("../storage/storage.js");
let fs = require("fs")


//?api_key=live_qJ4geMUe7XLJIdOTOzYE3SXypdeNQaOUjJnfaU11zHCLGMS93J0gKX7AeIl8YkQX

router.get("/", async(req, res) => {
    let { name } = req.query
    let conditions = {
        attributes: ["name", "min_weight", "max_weight", "weight", "id", "image"],
        include: {
            model: Temper,
            as: "temperament"
        },
    }

    if (name) {
        conditions.where = {
            name: {
                [Op.substring]: name
            }
        }
    }

    try {
        let dogs = await Breed.findAll(conditions);
        if (dogs.length === 0) {
            return res.status(404).send(dogs)
        }
        return res.status(200).send(dogs)
    } catch {
        return res.status(404).send([])
    }
});

router.get("/:idRaza", async(req, res) => {
    let id = req.params.idRaza;
    let dog = await Breed.findAll({
        attributes: ["name", "height", "min_height", "max_height", "min_weight", "max_weight", "weight", "min_life", "max_life", "yearsOfLife", "id", "image"],
        include: {
            model: Temper,
            as: "temperament"
        },
        where: {
            id
        }
    })
    if (!dog[0]) {
        return res.status(404).send("Not Found")
    } else {
        return res.status(200).send(dog)
    }

})

router.post("/", upload.single("image"), async(req, res) => {
    let { name, min_height, max_height, min_weight, max_weight, min_life, max_life, tempsId } = req.body;
    if (!name || !min_height || !max_height || !min_weight || !max_weight || !tempsId) {
        return res.status(404).send("Falta enviar datos obligatorios")
    }

    let dogs = await Breed.findAll();

    let image

    if (min_life === "") {
        min_life = undefined
    }
    if (max_life === "") {
        max_life = undefined
    }

    if (req.file) {
        image = req.file.filename
    }


    let newBreed = await Breed.create({
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        min_life,
        max_life,
        id: 1000 + dogs.length,
        image,
    });

    let addTempers = tempsId.map(t => newBreed.addTemperament(t));
    await Promise.all(addTempers)

    res.status(200).json(newBreed);
})

router.get("/images/:imageName", (req, res) => {
    let image = req.params.imageName
    fs.readFile(`./storage/imgs/${image}`, (err, data) => {
        if (err) {
            res.send("no se encontro la imagen")
        } else {
            res.setHeader("Content-Type", "image/jpg")
            res.send(data)
        }
    })
})



module.exports = router;