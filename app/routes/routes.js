var base58 = require('../encode/encoder');

var env = process.env.NODE_ENV || 'production';
var config = require('../../config/config')[env];

module.exports = function(app, db) {
    app.post('/short', (req, res) => {

        console.log(req.body);

        var url = req.body.url;
        var uniquId = 25;
        var shortUrl;
        
        db.hexists("urlhash",url,(err, reply) => {
            if(reply===0) {         
                console.log('URL not available, creating new....');    
                db.incr('urlUniqueId', function(err, reply) {
                    console.log(reply);
                    db.hset("urlhash", url,reply,function(err, reply) {
                        if(err) {
                            console.log("Eror in saving to urlhash");
                            res.send({'shortUrl':""});
                        }
                        

                        db.hget("urlhash",url,function(err, reply) {
                            if(err) {
                                console.log("Eror in retreiving from urlhash");
                                res.send({'shortUrl':""});
                            } else {
                                shortUrl = config.base_url+base58.encode(reply);
                                res.send({'shortUrl':shortUrl});
                            }
                        });
                    });

                    db.hset("idhash", reply, url, function(err, reply2) {
                        if(err)
                        console.log("Eror in saving to idhash");

                        console.log('Saving to idhash url: '+url);
                        console.log('Saving to idhash status: '+reply2);
                    });
                });
            } else {
                console.log('URL already available');
                db.hget("urlhash",url,function(err, reply) {
                    if(err) {
                        console.log("Error in getting from urlhash");
                        res.send({'shortUrl':shortUrl});
                    } else {
                        shortUrl = config.base_url+base58.encode(reply);
                        res.send({'shortUrl':shortUrl});
                    }
                                        
                });
            }

            
            
        });

        
    });


    app.post('/long', (req, res) => {
        console.log('Checking URL :'+req.body.url);
        var id = req.body.url.replace(config.base_url,"");
        console.log('Checking id before docode :'+id);
        id = base58.decode(id);
        console.log('Checking id :'+id);

        db.hget("idhash",id,function(err, reply) {
            if(err)
            console.log("Error in reading from idhash");

            console.log('Checking reply :'+reply);
            res.send({'longUrl': reply});
        });                
    });

    app.get('/:id', (req, res) => {
        var id = req.params.id;
        id = base58.decode(id);

        db.hget("idhash",id,function(err, reply) {
            if(err)
            console.log("Error in reading from idhash");

            res.redirect(reply);

        });   
    });   
};