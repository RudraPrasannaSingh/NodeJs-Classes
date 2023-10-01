function myMiddlerware(req, res, next) {
  console.log("This is first middleware");
  next();
}

module.exports = {
  myMiddlerware: myMiddlerware,
};
