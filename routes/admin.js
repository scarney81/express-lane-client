module.exports = function(app, ordersRepo) {

  app.get('/admin', requireAdminRights, function(req, res){
    ordersRepo.find(null, function(err, orders){
      if(err) throw err;
      res.render('admin', { orders: orders });
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
