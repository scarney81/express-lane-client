function requireAdminRights(req, res, next){
    if(!req.session || !req.session.auth || !req.session.auth.user || !req.session.auth.user.username)
      res.send('Unauthorized', 401);
    else if(req.session.auth.user.username !== 'SethCarney')
      res.send('Forbidden', 403);
    else
      next();
}

module.exports = function(app, ordersRepo) {

  app.get('/admin', requireAdminRights, function(req, res){
    ordersRepo.find(null, function(err, orders){
      if(err) throw err;
      var total = orders.length;
      var pending = orders.filter(function(order) { return order.status === 'pending'; });
      var complete = orders.filter(function(order) { return order.status === 'complete'; });
      var pending_percentage = (pending.length/total)*100;
      var complete_percentage = (complete.length/total)*100;
      res.render('admin', { orders: orders, total: total, pending: pending.length, complete: complete.length, pending_percentage: pending_percentage, complete_percentage: complete_percentage});
    });
  });

  app.post('/admin', requireAdminRights, function(req, res){
    var order_id = req.body.order_id;
    ordersRepo.mark_complete(order_id, function(err, order) {
      if(err) throw err;
      res.redirect('/admin');
    });
  });

};
