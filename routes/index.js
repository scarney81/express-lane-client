var
  Products = require('../products'),
  products = new Products(),
  Cart = require('../cart'),
  cart = new Cart(),
  Orders = require('../orders'),
  orders = new Orders();

module.exports.products = function(req, res){
  var page = req.param.page || 1;
  var pageSize = 10;
  products.find(page, pageSize, function(products){
    res.render('products', {local: {products: products}});
  });
};
module.exports.product = function(req, res){
  products.get(req.param.id, function(product){
    res.render('product', {local: {product: product}});
  });
};

module.exports.cart = function(req, res){
  cart.find(req.session.emailAddress, function(products){
    res.render('cart', {local: {products: products}});
  });
};
module.exports.add_to_cart = function(req, res){
  cart.add(req.session.emailAddress, req.body, function(){
    res.redirect('/cart');
  });
};
module.exports.remove_from_cart = function(req, res){
  cart.remove(req.session.emailAddress, req.body, function(){
    res.redirect('/cart');
  });
};

module.exports.checkout = function(req, res){
  res.render('checkout');
};
module.exports.checkout_post = function(req, res){
  cart.find(req.session.emailAddress, function(products){
    var order = {}; //TODO
    orders.add(order, function(){
      res.redirect('/orders');
    });
  });
};

module.exports.orders = function(req, res){
  orders.find(req.session.emailAddress, function(orders){
    res.render('orders');
  });
};

module.exports.admin = function(req, res){
  orders.find(function(orders){
    res.render('admin');
  });
};
module.exports.admin_post = function(req, res){
  //TODO
  res.redirect('/admin');
};
