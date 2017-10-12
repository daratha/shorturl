"use strict";

var expect = require('chai').expect,

    request = require('request'),

    config = require('../config/config'),

    app = require('../server'),

    redis = require('redis'),

   db  = require('../config/db'),

    client;

client = redis.createClient(db.port, db.host);

// Server tasks

describe('server', function () {

    // Beforehand, start the server

    var value = 0;
    before(function (done) {

        console.log('Starting the server');
        client.flushdb();

        done();

    });


    after(function (done) {

        console.log('Stopping the server');

        

        done();

    });

    

    describe('Test /short route', function () {

        var longUrl = 'https://www.nintex.com/blog/5-ways-to-save-20-minutes-a-day-with-workflow-processes/';
        it('should return a url which contains the base URL', function (done) {

            request.post({ url: 'http://localhost:8000/short',form : {url : longUrl} }, 
            
            function (error, response, body) {
                var shortUrl = JSON.parse(body).shortUrl;
                console.log("shortUrl  :: "+shortUrl);
                expect(body).to.include(config.base_url);
                expect(response.statusCode).to.equal(200);

                done();

                    //start of test for the long URL
                    describe('Test the /long route', function () {
                        it('should return a url which contains the base URL', function (done) {

                            request.post({ url: 'http://localhost:8000/long',form : {url : shortUrl} }, function (error, response, body) {

                                expect(body).to.include(longUrl);
                                expect(response.statusCode).to.equal(200);
                                done();

                            });

                        });

                     });
                     //end of test for the long URL

                     //start of test for the redirect
                     describe('Test the redirect route', function () {
                        it('should return a url which contains the base URL', function (done) {

                            request.get({ url: shortUrl}, function (error, response, body) {
                                expect(body).to.include("Hitting ‘refresh’ on a work email inbox just waiting on a reply from a famously slow-to-respond colleague");
                                expect(response.statusCode).to.equal(200);
                                done();

                            });

                        });

                     });
                     //end of test for the redirect

                     //start of test for the redirect /short route 2nd time
                     describe('Test /short route 2nd time, testing the existing URL', function () {

                        var longUrl = 'https://www.nintex.com/blog/5-ways-to-save-20-minutes-a-day-with-workflow-processes/';
                        it('should return a url which contains the base URL', function (done) {

                            request.post({ url: 'http://localhost:8000/short',form : {url : longUrl} }, 
                            
                            function (error, response, body) {
                                var shortUrl = JSON.parse(body).shortUrl;
                                console.log("shortUrl  :: "+shortUrl);
                                expect(body).to.include(config.base_url);
                                expect(response.statusCode).to.equal(200);
                                done();                   
                            });

                        });
                        

                    });
                    //end of test for the redirect

                    
            });

        });
        

    });




    


    


});