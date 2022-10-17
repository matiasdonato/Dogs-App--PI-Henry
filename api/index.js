let app = require("./server");
let { db } = require("./db/index.js")
let PORT = 3001;


db.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`);
    })
})