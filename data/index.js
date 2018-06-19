var homeJson = require('./mock/home.json');


var obj = {
    "/api/home": homeJson
}

module.exports = function(path) {
    return obj[path]
}