module.exports = function(cartRepo){
  return {

    all: function(req, res){
      cartRepo.find(req.session.emailAddress, function(products){
        res.render('cart', {local: {products: products}});
      });
    },

    insert: function(req, res){
      cartRepo.add(req.session.emailAddress, req.body, function(){
        res.redirect('/cart');
      });
    },

    remove: function(req, res){
      cartRepo.remove(req.session.emailAddress, req.body, function(){
        res.redirect('/cart');
      });
    }

  };
};
