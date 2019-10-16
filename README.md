# Twitter

In order to install, download the zip file and install express, cookieParser, body-parser, and pug using the following command:

npm install --save express cookie-parser body-parser pug

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const Body = require("body-parser");
const routes = require("./routes");
app.set("view engine", "pug");

Make sure you update your credential information in routes.js. 
