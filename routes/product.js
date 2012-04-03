module.exports = function(productsRepo){
  return {

    all: function(req, res){
      var page = req.param.page || 1;
      var pageSize = 10;
      productsRepo.find(page, pageSize, function(products){
        res.render('products', {products: products});
      });
    },

    single: function(req, res){
      productsRepo.get(req.param.id, function(product){
        res.render('product', {product: product});
      });
    }

  };
};
