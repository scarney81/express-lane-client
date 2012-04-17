var request = require('request');

module.exports = function(config) {
  return {

    find: function(username, cb){
      var url = config.serverUrl + '/orders';
      if (username) url += '/' + username;
      var options = { json: true, method: 'get', url: url };
      request(options, function(err, res, body) {
        if (err !== null) cb(err);
        else cb(null, body);
      });
    },

    add: function(username, productsInCart, cb){
      if(!username || !username.length){
        cb('no username');
        return;
      }
      if(!productsInCart || !productsInCart.length){
        cb('no products in cart');
        return;
      }

      var order = {
        username: username,
        products: productsInCart.map(function(productInCart){
          return {
            _id: productInCart.product._id,
            image: productInCart.product.image,
            name: productInCart.product.name,
            price: productInCart.product.price,
            quantity: productInCart.quantity
          };
        }),
        total_price: productsInCart.reduce(function(prev, cur){
          return prev + (cur.quantity * cur.product.price);
        }, 0),
        billing: { //TODO?
          cc_no: '',
          cvs: '',
          exp_date: '',
          name: '',
          zip: ''
        },
        shipping: { //TODO?
          address: '',
          city: '',
          state: '',
          zip: ''
        }
      };

      var url = config.serverUrl + '/orders';
      var options = { json: true, method: 'post', url: url, body: order };
      request(options, function(err, res, body) {
        if (err !== null) cb(err);
        else cb(null, body);
      });
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
