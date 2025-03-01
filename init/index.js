const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://48vineet:Vineet%40123@airbnb.5tsow.mongodb.net/?retryWrites=true&w=majority&appName=AirBnB";

main().then(() => {
    console.log("Connected to Db");
})
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "67c31d47d7a46111e045571c" }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");

};

initDB();