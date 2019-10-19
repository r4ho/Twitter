const express = require("express");
const router = express.Router();

const Twit = require("twit");
const T = new Twit({
  consumer_key: '',
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
  var tweet;
  T.get("statuses/show/:id", id, function(err, data, response) {
    tweet = data.text;
    console.log(tweet);
    if(err) { 
      res.render('tweetdeleted', err)
    }
    else
    res.render("tweetretrieved", {
      tweet: tweet,
      id: req.body.tweet
    });
  });
});

router.get("/deletetweet", function(req, res) {
  res.render("deletetweet");
});

router.post("/deletetweet", function(req, res) {
  console.dir(req.body.tweet);
  var id = { id: req.body.tweet };
  T.post("statuses/destroy/:id", id, function(err, data, response) {
    if(err) { 
      res.render('tweetdeleted', err)
    }
    else res.render("tweetdeleted", id);
  });
});

router.post("/newtweet", function(req, res) {
  console.dir(req.body);
  console.log(req.body.toString()); // this is the tweet message
  T.post(
    "statuses/update",
    { status: req.body.tweet },
    (err, data, response) => {
      if (err) console.log(err);
      else {
        console.log(data);
        res.render("tweetsent", { data: req.body.tweet, id: data.id_str });
      }
    }
  );
});

module.exports = router;
