let { Sequelize, Op } = require("sequelize");
let modelBreed = require("./models/Breed.js")
let modelTemper = require("./models/Temper.js")

// "scripts": {
//     "start": "node index.js"
// }

const db = new Sequelize('d4shnt4ivtrd0p', 'riciakmvlxhejf', '0cc2813ea72c9900c9202d4c25834cb65b54e56cab67b639f8cb9dc62de5c666', {
    host: 'ec2-44-210-228-110.compute-1.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
});

// const db = new Sequelize('postgres://matiasdonato:dona090504@localhost/dogs', {
//     logging: false,
// });

//new Sequelize('postgres://riciakmvlxhejf:0cc2813ea72c9900c9202d4c25834cb65b54e56cab67b639f8cb9dc62de5c666@lec2-44-210-228-110.compute-1.amazonaws.com:5432/d4shnt4ivtrd0p', {
//     logging: false,
// });

modelBreed(db);
modelTemper(db);

let { Breed, Temper } = db.models;

Breed.belongsToMany(Temper, { as: "temperament", through: "BreedTemp" });
Temper.belongsToMany(Breed, { through: "BreedTemp" });


module.exports = {
    ...db.models,
    db,
    Op
}