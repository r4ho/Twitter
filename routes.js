const express = require("express");
const router = express.Router();

const Twit = require("twit");
const T = new Twit({
  consumer_key: 'LvmxJs1Q6YVpvVOVVHf8YVyeE' ,
  consumer_secret: 'aOjbBKV1zpsia2zsTzjMUMDYM9fGfbUG24FoNkB5I2FkcJksZO',
  access_token: '1178199351169961989-Rp2tfBtq53wUMFs4JdvrIOJlF8HR0I',
  access_token_secret: 'jLpy9QNQdiN9vcPxgT3VwlGxkDkJg8kUuUt3CqkSAkBtM',
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
