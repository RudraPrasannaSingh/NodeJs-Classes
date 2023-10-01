let express = require("express");

let myMiddlerwareFunction = require("./middleware/middle");
const morgan = require("morgan");
let app = express();

//Middleware
app.use(express.json());
app.use(myMiddlerwareFunction);
app.use(function (req, res, next) {
  console.log("This is second middleware");
  next();
});

app.use(morgan());

let courses = [
  { id: 1, name: "java" },
  { id: 2, name: ".NET" },
  { id: 3, name: "node" },
];
//get,post, put, delete
app.get("/", (req, res) => {
  res.send("Hello from your friend rudra");
});

app.get("/about", (req, res) => {
  res.send("We create impact");
});

app.get("/contact", (req, res) => {
  res.send("Contact us at abc@gmai.com");
});

// app.get("/courses/:id", (req, res) => {
//   const course = courses.find(
//     (course) => course.id === parseInt(req.params.id)
//   );
//   res.send(course);
// });

app.get("/courses/:coursename", (req, res) => {
  console.log(req.params.coursename);
  let course1 = courses.find((course) => course.name === req.params.coursename);
  if (!course1) {
    res.status(404).send("The course you are searching is unavailable");
  }
  res.send(course1);
});

app.get("/courses", (req, res) => {
  res.send(courses);
});

//POST
app.post("/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(courses);
});

//Put
app.put("/courses/:coursename", (req, res) => {
  const course = courses.find(
    (course) => course.name === req.params.coursename
  );
  if (!course) res.status(400).send("This is unavailabel");

  course.name = req.body.name;
  res.send(course);
});

//Delete
// app.delete("/courses/:coursename", (req, res) => {
//   let updatecourse = courses.filter(
//     (course) => course.name !== req.params.coursename
//   );
//   courses = updatecourse;
//   res.send(courses);
// });

app.delete("/courses/:id", (req, res) => {
  let updatecourse = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!updatecourse) res.status(400).send("This is unavailable");
  const index = courses.indexOf(updatecourse);
  courses.splice(index, 1);
  res.send(courses);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Port is running on ${port}`));
