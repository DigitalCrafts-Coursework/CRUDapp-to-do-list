const express = require("express"),
  app = express(),
  port = 3000;

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./src/views/");

const router = require("./src/routes/router");
app.use("/", router);

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
