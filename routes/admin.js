module.exports = function(ordersRepo){
  return {

    admin: function(req, res){
      ordersRepo.find(function(orders){
        res.render('admin');
      });
    },

    admin_post: function(req, res){
      //TODO
      res.redirect('/admin');
    }

  };
};
