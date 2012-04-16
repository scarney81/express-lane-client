var request = require('request');

var makeRequest = function(options, cb) {
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

  self.find = function(cb){
    var url = baseUrl + '/orders';
    var options = { json: true, method: 'get', url: url };
    makeRequest(options, cb);
  };

  self.add = function(order, cb){
    cb();
  };
  
  self.mark_complete = function(id, cb) {
    var url = baseUrl + '/order/' + id + '/complete';
    var options = { json: true, method: 'post', url: url };
    makeRequest(options, cb);
  };

  return self;
};
