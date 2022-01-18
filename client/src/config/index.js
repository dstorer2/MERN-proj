const url = require('url');
const path = require('path');
function clone (o) { return JSON.parse(JSON.stringify(o)); }

let geoUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=seachTerms&key=AIzaSyAWB7uaYPitCLrrk1GN9Oo1I6VA3mwDg08";
let apiUrl = "http://localhost:3000/"


let config = {
        geo: url.parse(geoUrl),
        api:  url.parse(apiUrl)
    // api: url.parse(apiUrl),
    // logger: { format: 'dev' },
    // session: {
    //     secret: 'keyboard cat',
    //     cookie: { },
    //     resave: false,
    //     saveUninitialized: false
    // },
    // enableTrustProxy: false,
    // staticAssets: {
    //     path: path.resolve(path.join(__dirname, '../build'))
    // }
};

let envs = {
    development: clone(config)
}

let environment = "development";

module.exports = envs[environment];