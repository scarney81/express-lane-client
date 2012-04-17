var request = require('request');

module.exports = function(config) {
  return {

    find: function(emailAddress, cb){
      var url = config.serverUrl + '/orders';
      var options = { json: true, method: 'get', url: url };
      request(options, function(err, res, body) {
        if (err !== null) cb(err);
        else cb(null, body);
      });
    },

    add: function(emailAddress, productsInCart, cb){
      cb(null, null);
    },

    mark_complete: function(id, cb) {
      var url = config.serverUrl + '/order/' + id + '/complete';
      var options = { json: true, method: 'post', url: url };
      request(options, function(err, res, body) {
        if (err !== null) cb(err);
        else cb(null, body);
      });
    }

  };
};
