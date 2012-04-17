module.exports = function(app, cartRepo, productsRepo){

  app.get('/cart', function(req, res){
    cartRepo.find(req.session, function(err, products){
      res.render('cart', {products: products});
    });
  });

  app.post('/cart/:product_id', function(req, res){
    productsRepo.get(req.params.product_id, function(err, product){
      cartRepo.increment(req.session, product, function(err){
        res.redirect('/cart');
      });
    });
  });

  app.del('/cart/:product_id', function(req, res){
    productsRepo.get(req.params.product_id, function(err, product){
      cartRepo.remove(req.session, product, function(err){
        res.redirect('/cart');
      });
    });
  });

};
