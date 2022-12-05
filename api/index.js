let app = require("./src/server");
let { db } = require("./src/db/index.js")
let LOCALPORT = 3001;


db.sync({ force: false }).then(() => {
    app.listen(process.env.PORT || LOCALPORT, () => {
        console.log(`server listening at ${LOCALPORT}`);
    })
})

// .