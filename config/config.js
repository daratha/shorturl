var config = {
development: {
    //url to be used in link generation
    base_url: 'http://localhost:1337/',
    //redis connection settings
    database: {
        host:   'redis',
        port:   '6379',
        db:     'site_dev'
    },
    //server details
    server: {
        host: '127.0.0.1',
        server_port: '1337'
    }
},
production : {
    //url to be used in link generation
    base_url: 'http://ec2-52-14-29-158.us-east-2.compute.amazonaws.com/',
    //redis connection settings
    database: {
        host:   'redis',
        port:   '6379',
        db:     'site_dev'
    },
    //server details
    server: {
        host:   '127.0.0.1',
        server_port:   '1337'
    }
}
};
module.exports = config;