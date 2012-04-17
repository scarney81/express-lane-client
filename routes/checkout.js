module.exports = function(app, cartRepo, ordersRepo){

  app.post('/orders', function(req, res){
    cartRepo.find(req.session, function(err, productsInCart){
      ordersRepo.add(req.session.emailAddress, productsInCart, function(err, order){
        cartRepo.empty(req.session, function(err){
          res.redirect('/orders');
        });
      });
    });
  });

  app.get('/orders', function(req, res){
    ordersRepo.find(req.session.emailAddress, function(err, orders){
      res.render('orders', {orders: orders});
    });
  });

};
