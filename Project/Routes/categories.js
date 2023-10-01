const express = require("express");
const { Category, validate } = require("../models/categoriesModel");
const router = express.Router();

// const categories = [
//   { id: 1, name: "web" },
//   { id: 2, name: "mobile" },
//   { id: 3, name: "photography" },
// ];

router.get("/api/categories", async (req, res) => {
  let categories = await Category.find();
  if (!categories) return res.status(404).send("No data");
  res.send(categories);
});

router.post("/api/categories", async (req, res) => {
  // Validate the request body against a schema object
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = new Category({
    //The id is commented as we mongodb will generate id
    // id: categories.length + 1,
    name: req.body.name,
  });
  // categories.push(category);
  await category.save();
  res.send(category);
});

router.put("/api/categories/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  // const category = categoryModel.find((c) => c.id === parseInt(req.params.id));
  if (!category)
    return res.status(404).send("The category with the ID is not present");
  // category.name = req.body.name;
  res.send(category);
});

router.delete("/api/categories/:id", async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category)
    return res.status(404).send("The category id given is not found");
  // const index = categoryModel.indexOf(category);
  // categoryModel.splice(index, 1);
  res.send(category);
});

router.get("/api/categories/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  // const category = categoryModel.find((c) => c.id === parseInt(req.params.id));
  if (!category) return res.status(404).send("The id is not present");
  res.send(category);
});

module.exports = router;
