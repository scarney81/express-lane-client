module.exports = function(app, ordersRepo) {

  app.get('/admin', function(req, res) {
    ordersRepo.all(function(err, orders) {
      var total = orders.length;
      var pending = orders.filter(function(order) { return order.status === 'pending'; });
      var complete = orders.filter(function(order) { return order.status === 'complete'; });
      var pending_percentage = (pending.length/total)*100;
      var complete_percentage = (complete.length/total)*100;
      res.render('admin', { orders: orders, pending_percentage: pending_percentage, complete_percentage: complete_percentage});
    });
  });

  app.post('/admin', function(req, res){
    var order_id = req.body.order_id;
    ordersRepo.mark_complete(order_id, function(err, order) {
      if(err) throw err;
      res.redirect('/admin');
    });
  });

};
