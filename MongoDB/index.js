const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/TestDatabase")
  .then(() => console.log("connection is successful"))
  .catch((error) => console.error("Could not connect to mongo DB", error));

//Schema

const CourseSchema = mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  publishedDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, required: true },
  rating: Number,
});

//classes,objects
const Course = mongoose.model("Course", CourseSchema);

//Create
async function createCourse() {
  const course = new Course({
    name: "node",
    // creator: "Rudra",
    // isPublished: true,
    // rating: 4.6,
  });
  try {
    await course.validate(); //We can write this code instead of const result = await course.save();
    // const result = await course.save();
    // console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}

createCourse();

//Comparison Operators
// --------------
//eq(equal)
//gt(Greater than)
//gte(Greater than equal to)
//lt(less than)
//lte(less than equal to)

//in
//not in

//Logical Operator
//and
//in
async function getCourse() {
  const courses = await Course.find({ rating: { $gt: 4 } })
    .select({
      name: 1,
    })
    .and([{ rating: 3 }]);

  console.log(courses);
} //Read

// getCourse();

//Update Course
async function updateCourse(id) {
  let course = await Course.findById(id);
  if (!course) return;
  course.name = "Python";
  course.creator = "Me";
  const updatedCourse = await course.save();
  console.log(updatedCourse);
}
// updateCourse("64f69fabc78477410b828294");

//Deleting
async function deleteCourse(id) {
  let course = await Course.findByIdAndRemove(id);

  console.log(course);
}
// deleteCourse("64f69fe35cc1f3dfe5560fb6");
