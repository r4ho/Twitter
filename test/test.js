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
                    var a = JSON.parse(res.text);
                    global_id = a.id_str;
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
                    var a = JSON.parse(res.text);
                    var message = a.text
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
                    var a = JSON.parse(res.text)
                    var hasError = a.code
                    chai.assert.equal(hasError, 34);
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
                    var a = JSON.parse(res.text)
                    var hasError = a.code
                    chai.assert.equal(hasError, undefined);
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
                    var a = JSON.parse(res.text)
                    var hasError = a.code
                    chai.assert.equal(hasError, 34);
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
                    var a = JSON.parse(res.text);
                    id = a.id_str;
                    done()
                })
            
        });
        it("then delete it", done=>{
            chai.request("http://localhost:8000")
                .post("/deletetweet/")
                .send({"tweet": id})
                .end((err,res)=>{
                    res.should.have.status(200);
                    var a = JSON.parse(res.text)
                    var hasError = a.code
                    chai.assert.equal(hasError, undefined);
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
                    var a = JSON.parse(res.text);
                    id = a.id_str;
                    done()
                })
            
        });
        it("should read a tweet", done=>{
            chai.request("http://localhost:8000")
                .post("/gettweet/")
                .send({"tweet": id})
                .end((err,res)=>{
                    res.should.have.status(200);
                    var a = JSON.parse(res.text);
                    var message = a.text
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
                    var a = JSON.parse(res.text)
                    var hasError = a.code
                    chai.assert.equal(hasError, undefined);
                    done()
                })
        });
    })

    describe ("CREATE ONE AND READ ONE AND DELETE ONE AND READ FAIL AFTER", function(){
        var id = 0;
        it("should create a tweet", done=>{
            chai.request("http://localhost:8000")
                .post("/newtweet/")
                .send({"tweet": "test3"})
                .end((err,res)=>{
                    res.should.have.status(200);
                    var a = JSON.parse(res.text);
                    id = a.id_str;
                    done()
                })
            
        });
        it("should read a tweet", done=>{
            chai.request("http://localhost:8000")
                .post("/gettweet/")
                .send({"tweet": id})
                .end((err,res)=>{
                    res.should.have.status(200);
                    var a = JSON.parse(res.text);
                    var message = a.text
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
                    var a = JSON.parse(res.text)
                    var hasError = a.code
                    chai.assert.equal(hasError, undefined);
                    done()
                })
        });
        it("should read and fail", done=>{
            chai.request("http://localhost:8000")
                .post("/gettweet/")
                .send({"tweet": id})
                .end((err,res)=>{
                    res.should.have.status(200);
                    var a = JSON.parse(res.text)
                    var hasError = a.code
                    chai.assert.equal(hasError, 144);
                    done()
                })
            
        });
    })