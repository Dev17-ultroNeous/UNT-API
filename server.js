const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");


dotenv.config({ path: "./config.env" });
const db = process.env.DATABASE

mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('DB connection successfully')
}).catch((error) => console.log(error));



