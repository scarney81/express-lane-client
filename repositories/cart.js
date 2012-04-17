module.exports = function(){
  return {

    find: function(session, cb){
      var cart = session.cart || {};
      var itemsInCart = [];
      for(var key in cart)
        itemsInCart.push(cart[key]);
      cb(null, itemsInCart);
    },

    increment: function(session, product, cb){
      var cart = session.cart || {};
      var productInCart = cart[product._id] || {product: product, quantity: 0};
      productInCart.quantity++;
      cart[product._id] = productInCart;
      session.cart = cart;
      cb(null, productInCart.quantity);
    },

    remove: function(session, product, cb){
      var cart = session.cart || {};
      var productInCart = cart[product._id];
      delete cart[product._id];
      session.cart = cart;
      cb(null, productInCart.quantity);
    },

    empty: function(session, cb){
      session.cart = null;
      cb(null);
    }

  };
};
