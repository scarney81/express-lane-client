module.exports = function(app, cartRepo, productsRepo){

  app.get('/cart', function(req, res){
    cartRepo.find(req.session, function(err, productsInCart){
      if(err) throw err;
      res.render('cart', {
        cart: productsInCart,
        total: productsInCart.reduce(function(previous, current){
          return previous + (current.quantity * current.product.price);
        }, 0)
      });
    });
  });

  app.post('/cart/:product_id', function(req, res){
    productsRepo.get(req.params.product_id, function(err, product){
      if(err) throw err;
      cartRepo.increment(req.session, product, function(err){
        if(err) throw err;
        res.redirect('/cart');
      });
    });
  });

  app.del('/cart/:product_id', function(req, res){
    productsRepo.get(req.params.product_id, function(err, product){
      if(err) throw err;
      cartRepo.remove(req.session, product, function(err){
        if(err) throw err;
        res.redirect('/cart');
      });
    });
  });

};
