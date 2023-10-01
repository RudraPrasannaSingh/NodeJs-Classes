const express = require("express");
const mongoose = require("mongoose");

const categories = require("./Routes/categories");
const students = require("./Routes/students");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1/LearnByDoing")
  .then(() => console.log("connection is successful to MongoDB database"))
  .catch((error) => console.error("Could not connect to mongo DB", error));

app.use(express.json());
app.use(categories);
app.use("/api/students", students);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});
