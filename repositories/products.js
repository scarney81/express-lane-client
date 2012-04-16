var request = require('request');

var respond = function(cb) {
  if (err !== null) return 
};

module.exports = function(config) {
  var self = this;
  var baseUrl = config.serverUrl;

  self.find = function(page, pageSize, cb){
    var url = baseUrl + '/products';
    var options = {url: url, json: true, method: 'get'};
    request(options, function(err, res, body){
      if (err !== null) return cb(err);
      cb(null, body);
    });
  };

  self.get = function(id, cb){
    var url = baseUrl + '/product/' + id;
    var options = {url: url, json: true, method: 'get'};
    request(options, function(err, res, body){
      if (err !== null) {
        cb(err);
      } else {
      cb(null, body);
      }
    });
  };

  return this;
};
