module.exports = function(app, productsRepo){
  
  app.get('/', function(req, res){
      productsRepo.find(function(err, products){
        if (err !== null) products = [];
        res.render('products', {products: products});
      });
  });

  app.get('/products/:id', function(req, res){
    productsRepo.get(req.params.id, function(err, product){
      res.render('product', {product: product});
    });
  });
  
};
