const express = require("express");
const router = express.Router();

const Twit = require("twit");
const T = new Twit({
  consumer_key: '' ,
  consumer_secret: '',
  access_token: '',
  access_token_secret: '',
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true // optional - requires SSL certificates to be valid.
});

router.get("/", function(req, res) {
  res.render("index");
});

router.get("/createtweet", function(req, res) {
  res.render("createtweet");
});

router.get("/gettweet", function(req, res) {
  res.render("gettweet");
});

router.post("/gettweet", function(req, res) {
  var id = { id: req.body.tweet };
  T.get("statuses/show/:id", id, function(err, data, response) {
    if(err) { 
      res.send(err);
    } else {
      res.json(data);
    }
  });
});

router.get("/deletetweet", function(req, res) {
  res.render("deletetweet");
});

router.post("/deletetweet", function(req, res) {
  var id = { id: req.body.tweet };
  T.post("statuses/destroy/:id", id, function(err, data, response) {
    if(err) { 
      res.send(err);
    } else { 
      res.json(data);
    }
  });
});

router.post("/newtweet", function(req, res) {
  T.post(
    "statuses/update",
    { status: req.body.tweet },
    function(err, data, response) {
      if (err) { 
	    res.send(err);
      } else {
	res.json(data);
      }
    }
  );
});

module.exports = router;
