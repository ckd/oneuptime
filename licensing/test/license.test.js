let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
chai.use(chaiHttp);
let should = require('should');
let testData = require('./utils/licenseUtil')
const airtableService = require('../src/services/airtableService')


//TEST FOR VALID LICENSE
describe('Test for valid License', function(){
    this.timeout(4000) 
    var id

    before('ensuring anything gets started', (done)=>{ 
        id = airtableService.seedData({ tableName: 'License', license: testData.validLicense, date: testData.validDate })
        done()
    });

    it('it should confirm if license is valid and return token', (done) => {
        let userDetails = { 
            license: testData.validLicense,
            email: testData.email 
        }

        chai.request(server)
            .post('/license')
            .send(userDetails)
            .end((err, res) => {
                if(err) done(err)
                    res.should.have.property('status', 200)
                    res.body.should.have.property('token');   
                done();
            });
    });

    after('ensuring everything is cleaned up', (done)=>{
        airtableService.clearData({ tableName: 'License', id })
        done();
    });
});

//TEST FOR EXPIRED LICENSE
describe('Test for expired License', function(){
    this.timeout(4000)
    var id 

    before('ensuring anything gets started', (done)=>{
        id = airtableService.seedData({ tableName: 'License', license: testData.expiredLicense, date: testData.expiredDate })
        done()
    });

    it('it should check if license has expired', (done) => {
        let userDetails = { 
                            license: testData.expiredLicense, 
                            email : testData.email
                        }

        chai.request(server)
            .post('/license')
            .send(userDetails)
            .end((err, res) => {
                if(err) done(err)
                    res.should.have.property('status', 400)
                    res.body.should.have.property('message').eql('License Expired'); 
                done();
            });
    });

    after('ensuring everything is cleaned up', (done)=>{
        airtableService.clearData({ tableName: 'License', id })
        done();
    });
});

//TEST FOR MISSING PAYLOAD DATA
describe('Test for missing payload parameter', function(){
    this.timeout(4000)
    
    it('it should check if licensing is missing in the payload', (done) => {
        let userDetails = { email: testData.email }

        chai.request(server)
            .post('/license')
            .send(userDetails)
            .end((err, res) => {
                if(err) done(err)
                    res.should.have.property('status', 400)
                    res.body.should.have.property('message').eql('Please provide all the required details'); 
                done();
            });
    });
    
    it('it should check if email is missing in the payload', (done) => {
        let userDetails = { license: testData.validLicense }

        chai.request(server)
            .post('/license')
            .send(userDetails)
            .end((err, res) => {
                if(err) done(err)
                    res.should.have.property('status', 400)
                    res.body.should.have.property('message').eql('Please provide all the required details'); 
                done();
            });
    });
});

//TEST FOR INVALID LICENSE
describe('Test for invalid License', function(){
    this.timeout(4000)
    
    it('it should check if license is invalid and return a not found response', (done) => {
        let userDetails = { license: testData.invalidLicense, 
                            email: testData.email 
                        }

        chai.request(server)
            .post('/license')
            .send(userDetails)
            .end((err, res) => {
                if(err) done(err)
                    res.should.have.property('status', 400)
                    res.body.should.have.property('message').eql('Not Found'); 
                done();
            });
    });
});