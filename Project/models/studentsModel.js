const joi = require("joi");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  isEnrolled: { type: Boolean, default: false },
  phone: { type: String, required: true, minlength: 10, maxlength: 25 },
});

const studentModel = mongoose.model("Student", studentSchema);

function validateData(student) {
  const schema = {
    name: joi.string().min(5).max(50).required(),
    phone: joi.string().min(10).max(50).required(),
    isEnrolled: joi.boolean().required(),
  };
  return joi.validate(student, schema);
}

exports.Student = studentModel;
exports.validate = validateData;
