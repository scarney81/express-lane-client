module.exports = function(ordersRepo){
  return {

    admin: function(req, res){
      ordersRepo.find(function(err, orders){
        res.render('admin', { orders: orders });
      });
    },

    admin_post: function(req, res){
      //TODO
      res.redirect('/admin');
    }

  };
};
