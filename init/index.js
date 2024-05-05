const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/Project");
}
main().then(() => {
  console.log("Connection successful");
});

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "662227dcbac3036728093e10",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data is initaialized");
};

initDB();
