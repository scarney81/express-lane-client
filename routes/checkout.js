module.exports = function(cartRepo, ordersRepo){
  return {

    checkout: function(req, res){
      res.render('checkout');
    },

    checkout_post: function(req, res){
      cartRepo.find(req.session.emailAddress, function(products){
        var order = {}; //TODO
        ordersRepo.add(order, function(){
          res.redirect('/orders');
        });
      });
    },

    orders: function(req, res){
      ordersRepo.find(req.session.emailAddress, function(orders){
        res.render('orders');
      });
    }

  };
};
