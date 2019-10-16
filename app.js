const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const Body = require("body-parser");
const routes = require("./routes");
app.set("view engine", "pug");
app.use(Body.json());
app.use(Body.urlencoded({ extended: true }));
app.use(routes);
app.use(cookieParser());

app.listen(8000, function() {
  console.log("Example app listening on port 8000!");
});
