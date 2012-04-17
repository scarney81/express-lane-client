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
  return {

    find: function(cb){
      var url = config.serverUrl + '/orders';
      var options = { json: true, method: 'get', url: url };
      makeRequest(options, cb);
    },

    add: function(order, cb){
      cb(null, null);
    },

    mark_complete: function(id, cb) {
      var url = config.serverUrl + '/order/' + id + '/complete';
      var options = { json: true, method: 'post', url: url };
      makeRequest(options, cb);
    }

  };
};
