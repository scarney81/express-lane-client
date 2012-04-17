module.exports = function(app, productsRepo){

  app.get('/', function(req, res){
    productsRepo.find(function(err, products){
      if(err) throw err;
      res.render('products', {products: products});
    });
  });

  app.get('/products/:product_id', function(req, res, next){
    productsRepo.get(req.params.product_id, function(err, product){
      if(err) throw err;
      res.render('product', {product: product});
    });
  });

};
