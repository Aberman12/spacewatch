var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var port = 3000;
var router = require("./router.js");
var session = require("express-session");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../react-client/dist"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60000
    }
  })
);

app.use("/api", router);

app.listen(port, function() {
  console.log("successfully connected on port: ", port);
});
