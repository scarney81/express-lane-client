module.exports = function(app, ordersRepo){

  app.get('/admin', function(req, res){
    ordersRepo.find(null, function(err, orders){
      res.render('admin', { orders: orders });
    });
  });

  app.post('/admin', function(req, res){
    var order_id = req.body.order_id;
    ordersRepo.mark_complete(order_id, function(err, order) {
      res.redirect('/admin');
    });
  });

};
