function requireLogin(req, res, next){
  if(!req.session || !req.session.auth || !req.session.auth.user || !req.session.auth.user.username)
    res.send('Unauthorized', 401);
  else
    next();
}

module.exports = function(app, cartRepo, ordersRepo){

  app.post('/orders', requireLogin, function(req, res){
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

  app.get('/orders', requireLogin, function(req, res){
    ordersRepo.find(req.session.auth.user.username, function(err, orders){
      if(err) throw err;
      res.render('orders', {orders: orders});
    });
  });

};
