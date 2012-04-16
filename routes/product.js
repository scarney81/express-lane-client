module.exports = function(productsRepo){
  return {

    all: function(req, res){
      var page = req.params.page || 1;
      var pageSize = 10;
      productsRepo.find(page, pageSize, function(err, products){
        if (err !== null) products = [];
        res.render('products', {products: products});
      });
    },

    single: function(req, res){
      productsRepo.get(req.params.id, function(err, product){
        res.render('product', {product: product});
      });
    }

  };
};
