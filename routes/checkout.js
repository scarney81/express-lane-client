module.exports = function(app, cartRepo, ordersRepo){

  app.get('/checkout', function(req, res){
    res.render('checkout');
  });

  app.post('/checkout', function(req, res){
    cartRepo.find(req.session.emailAddress, function(products){
      var order = {}; //TODO
      ordersRepo.add(order, function(){
        res.redirect('/orders');
      });
    });
  });

  app.get('/orders', function(req, res){
    ordersRepo.find(req.session.emailAddress, function(orders){
      res.render('orders');
    });
  });

};
