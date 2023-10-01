const joi = require("joi");
const string = require("joi/lib/types/string");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
});

const categoryModel = mongoose.model("Category", categorySchema);

function validateData(category) {
  const schema = {
    name: joi.string().min(3).required(),
  };
  return joi.validate(category, schema);
}

exports.Category = categoryModel;
exports.validate = validateData;
