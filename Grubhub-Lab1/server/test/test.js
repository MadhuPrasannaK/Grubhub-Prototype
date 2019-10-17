var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check login credentials and return status code", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/login')
    .send({ "email": "user@user.com", "password" : "1234"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

it("Should check login credentials and return status code", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/register')
    .send({ "first_name": "FirstRandom", "last_name" : "LastRandom", "email": "random@random.com", "password":"12345678"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

it("Should return orders of the restaurant", function(done){
    chai.request('http://127.0.0.1:3001')
    .get('/order/restaurant/1')
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

it("Should return menu of the restaurant", function(done){
    chai.request('http://127.0.0.1:3001')
    .get('/restaurant/menu/1')
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

it("Should return details of the restaurant", function(done){
    chai.request('http://127.0.0.1:3001')
    .get('/restaurant/2')
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})