module.exports = function(app, cartRepo, productsRepo){

  app.get('/cart', function(req, res){
    cartRepo.find(req.session, function(products){
      res.render('cart', {products: products});
    });
  });

  app.put('/cart', function(req, res){
    productsRepo.get(req.params.id, function(product){
      cartRepo.add(req.session, product, function(){
        res.redirect('/cart');
      });
    });
  });

  app.del('/cart', function(req, res){
    productsRepo.get(req.params.id, function(product){
      cartRepo.remove(req.session, product, function(){
        res.redirect('/cart');
      });
    });
  });

};
