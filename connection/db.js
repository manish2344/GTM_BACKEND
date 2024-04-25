const mongoose = require("mongoose");

let DB_URI = "mongodb+srv://manishpanwar682:QN2Dh4JGpE58jLwM@cluster0.iqo54dv.mongodb.net/databasedata";
mongoose
  .connect(DB_URI)
  .then(() => console.log("connection successful"))
  .catch((error) => {
    console.log(error.message);
  });
