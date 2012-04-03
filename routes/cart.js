module.exports = function(cartRepo, productsRepo){
  return {

    all: function(req, res){
      cartRepo.find(req.session, function(products){
        res.render('cart', {products: products});
      });
    },

    insert: function(req, res){
      productsRepo.get(req.params.id, function(product){
        cartRepo.add(req.session, product, function(){
          res.redirect('/cart');
        });
      });
    },

    remove: function(req, res){
      productsRepo.get(req.params.id, function(product){
        cartRepo.remove(req.session, product, function(){
          res.redirect('/cart');
        });
      });
    }

  };
};
