exports.products = function(req, res){
  res.render('products');
};

exports.product = function(req, res){
  res.render('product');
};

exports.cart = function(req, res){
  res.render('cart');
};

exports.checkout = function(req, res){
  res.render('checkout');
};

exports.orders = function(req, res){
  res.render('orders');
};

exports.admin = function(req, res){
  res.render('admin');
};
