module.exports = function(app, cartRepo, ordersRepo){

  app.post('/orders', function(req, res){
    cartRepo.find(req.session, function(err, productsInCart){
      if(err) throw err;
      ordersRepo.add(req.session.auth.user.username, productsInCart, function(err, order){
        if(err) throw err;
        cartRepo.empty(req.session, function(err){
          if(err) throw err;
          res.redirect('/orders');
        });
      });
    });
  });

  app.get('/orders', function(req, res){
    ordersRepo.find(req.session.auth.user.username, function(err, orders){
      if(err) throw err;
      res.render('orders', {orders: orders});
    });
  });

};
