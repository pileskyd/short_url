/* Config */
const { PORT } = require("./config");

/* Import */
const { error, success } = require("./utils/logger");

const fs = require("fs");
const mongoose = require("mongoose");

const express = require("express");
const compression = require("compression");

const viewRouter = require("./routes/viewRouter");
const apiRouter = require("./routes/apiRouter");

/* App */
const app = express();

// template
app.engine("html", function (filePath, options, callback) {
  // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(err);
    // this is an extremely simple template engine
    var rendered = content
      .toString()
      .replaceAll("#title#", options.title)
      .replaceAll("#type#", options.type)
      .replaceAll("#message#", options.message);
    return callback(null, rendered);
  });
});
app.set("views", "./view"); // specify the views directory
app.set("view engine", "html"); // register the template engine

// static files
app.use(compression()); // compress static files
app.use("/public/css", express.static("view/public/css")); // css
app.use("/public/js", express.static("view/public/js")); // js
app.use("/public/img", express.static("view/public/img")); // img

// root middlewares
app.use(express.json()); // row with json in post query

app.use("/", viewRouter);
app.use("/api", apiRouter);
app.all("*", (req, res) => {
  res.redirect("/");
});

/* Start */
async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://suser:suser@cluster0.7maj3.mongodb.net/Project 0?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => {
      success(`Server listen: http://localhost:${PORT}/`);
    });
  } catch (error) {
    error(error);
  }
}

start();
