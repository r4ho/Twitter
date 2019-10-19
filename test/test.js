var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../app");
let should = chai.should();
chai.use(chaiHttp);

    var global_id = 0;
    describe ("CREATE ONE", function(){
        it("should create a tweet", done=>{
            console.log ("Creating tweetfirst.")
            chai.request("http://localhost:8000")
                .post("/newtweet/")
                .send({"tweet": "test1"})
                .end((err,res)=>{
                    res.should.have.status(200);
                    global_id =res['text'].slice(res['text'].lastIndexOf("<p>") + 3, res['text'].lastIndexOf("</p>"))
                    done()
                })
        })

    })

    describe ("READ ONE", function(){
        it("should read a tweet", done=>{
            chai.request("http://localhost:8000")
                .post("/gettweet/")
                .send({"tweet": global_id})
                .end((err,res)=>{
                    res.should.have.status(200);
                    console.log("####" + res.text);
                    var message = res['text'].slice(res['text'].lastIndexOf("<p>") + 3, res['text'].lastIndexOf("</p>"))
                    chai.assert.equal(message, 'test1')
                    done()
                })
        })

    })

    describe ("READ FAKE", function(){
        it("should read a fake tweet", done=>{
            chai.request("http://localhost:8000")
                .post("/gettweet/")
                .send({"tweet": 'fake_id'})
                .end((err,res)=>{
                    var hasError = res['text'].slice(res['text'].lastIndexOf("<h2>") + 4, res['text'].lastIndexOf("</h2>"))
                    chai.assert.equal(hasError, "Error With Id");
                    done()
                })
        })

    })

    describe ("DELETE ONE", function(){
        it("then delete it", done=>{
            chai.request("http://localhost:8000")
                .post("/deletetweet/")
                .send({"tweet": global_id})
                .end((err,res)=>{
                    var hasError = res['text'].slice(res['text'].lastIndexOf("<h2>") + 4, res['text'].lastIndexOf("</h2>"))
                    chai.assert.equal(hasError, " Tweet was deleted!")
                    done()
                })
        });
    })

    describe ("DELETE FAKE", function(){
        it("then delete it", done=>{
            chai.request("http://localhost:8000")
                .post("/deletetweet/")
                .send({"tweet": 'fake_id'})
                .end((err,res)=>{
                    var hasError = res['text'].slice(res['text'].lastIndexOf("<h2>") + 4, res['text'].lastIndexOf("</h2>"))
                    chai.assert.equal(hasError, "Error With Id");
                    done()
                })
        });
    })

    describe ("CREATE ONE AND DELETE TWEET", function(){
        var id = 0;
        it("should create a tweet", done=>{
            chai.request("http://localhost:8000")
                .post("/newtweet/")
                .send({"tweet": "test2"})
                .end((err,res)=>{
                    res.should.have.status(200);
                    id =res['text'].slice(res['text'].lastIndexOf("<p>") + 3, res['text'].lastIndexOf("</p>"))
                    done()
                })
            
        });
        it("then delete it", done=>{
            chai.request("http://localhost:8000")
                .post("/deletetweet/")
                .send({"tweet": id})
                .end((err,res)=>{
                    res.should.have.status(200);
                    done()
                })
        });
    })

    describe ("CREATE ONE AND READ ONE AND DELETE ONE", function(){
        var id = 0;
        it("should create a tweet", done=>{
            chai.request("http://localhost:8000")
                .post("/newtweet/")
                .send({"tweet": "test3"})
                .end((err,res)=>{
                    res.should.have.status(200);
                    id =res['text'].slice(res['text'].lastIndexOf("<p>") + 3, res['text'].lastIndexOf("</p>"))
                    done()
                })
            
        });
        it("should read a tweet", done=>{
            chai.request("http://localhost:8000")
                .post("/gettweet/")
                .send({"tweet": id})
                .end((err,res)=>{
                    res.should.have.status(200);
                    var message = res['text'].slice(res['text'].lastIndexOf("<p>") + 3, res['text'].lastIndexOf("</p>"))
                    chai.assert.equal(message, 'test3')
                    done()
                })
            
        });
        it("then delete it", done=>{
            chai.request("http://localhost:8000")
                .post("/deletetweet/")
                .send({"tweet": id})
                .end((err,res)=>{
                    res.should.have.status(200);
                    done()
                })
        });
    })