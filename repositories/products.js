var request = require('request');

module.exports = function(config) {
  return {
    
    find: function(cb){
      var url = config.serverUrl + '/products';
      var options = { json: true, method: 'get', url: url };
      request(options, function(err, res, body) {
        if (err !== null) cb(err);
        else cb(null, body);
      });
    },
    get: function(id, cb){
      var url = config.serverUrl + '/product/' + id;
      var options = { json: true, method: 'get', url: url };
      request(options, function(err, res, body) {
        if (err !== null) cb(err);
        else cb(null, body);
      });
    }
    
  };
};
