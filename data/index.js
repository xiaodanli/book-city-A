var homeJson = require('./mock/json.json');

var obj = {
    "/api/home": homeJson
}

module.exports = function(path) {
    return obj[path]
}