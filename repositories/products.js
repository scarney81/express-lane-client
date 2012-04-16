var request = require('request');

var makeRequest = function(url, cb) {
  var options = { json: true, method: 'get', url: url };
  request(options, function(err, res, body) {
    if (err !== null) {
      cb(err);
    } else if (res.statusCode !== 200 && res.statusCode !== 201) {
      cb(res.statusCode + ": " + body);
    } else {
      cb(null, body);
    }
  });
};

module.exports = function(config) {
  var self = this;
  var baseUrl = config.serverUrl;
  var baseOptions = { json: true, method: 'get' };

  self.find = function(page, pageSize, cb){
    var url = baseUrl + '/products';
    makeRequest(url, cb);
  };

  self.get = function(id, cb){
    var url = baseUrl + '/product/' + id;
    makeRequest(url, cb);
  };

  return this;
};
