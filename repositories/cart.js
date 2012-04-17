module.exports = function(){
  return {

    find: function(session, cb){
      var cart = session.cart || {};
      var itemsInCart = [];
      for(var key in cart)
        itemsInCart.push({ id: key, quantity: cart[key] });
      cb(null, itemsInCart);
    },

    increment: function(session, product, cb){
      var cart = session.cart || {};
      var quantity = (cart[product._id] || 0) + 1;
      cart[product._id] = quantity;
      session.cart = cart;
      cb(null, quantity);
    },

    remove: function(session, product, cb){
      var cart = session.cart || {};
      var quantity = cart[product._id];
      delete cart[product._id];
      session.cart = cart;
      cb(null, quantity);
    }

  };
};
