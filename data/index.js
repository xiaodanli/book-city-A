var homeJson = require('./mock/home.json');
var hotJson = require('./mock/search-hot.json');
var zhuJson = require('./mock/search-zhu.json');
var tianJson = require('./mock/search-tian.json');
var detail_352876 = require('./mock/352876.json');

var obj = {
    '/api/home': homeJson,
    '/api/hot': hotJson,
    '/api/search?key=诛仙': zhuJson,
    '/api/search?key=择天记': tianJson,
    '/api/detail?fiction_id=352876': detail_352876
}

module.exports = function(path) {
    return obj[path] || null
}