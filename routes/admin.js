module.exports = function(ordersRepo){
  return {

    admin: function(req, res){
      ordersRepo.find(function(err, orders){
        res.render('admin', { orders: orders });
      });
    },

    admin_post: function(req, res){
      var order_id = req.body.order_id;
      ordersRepo.mark_complete(order_id, function(err, order) {
        res.redirect('/admin');
      });
    }

  };
};
