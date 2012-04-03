var express = require('express')
  , config = {
    port: (process.env.PORT || 3000),
    secret: (process.env.SECRET || 'i can haz sekrets?')
  }
  , repos = {
    cart: require('./cart'),
    orders: require('./orders'),
    products: require('./products')
  }
  , routes = {
    admin: require('./routes/admin')(new repos.orders()),
    cart: require('./routes/cart')(new repos.cart()),
    checkout: require('./routes/checkout')(new repos.cart(), new repos.orders()),
    product: require('./routes/product')(new repos.products())
  };
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: config.secret }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
app.configure('development', function(){
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});
app.configure('production', function(){
  app.use(express.errorHandler());
});

// Helpers (globally available to view engine)

app.helpers({
  title: 'Express Lane'
});
app.dynamicHelpers({
  isLoggedIn: function(req){
    return false;
  },

  hasAdminAccess: function(req){
    return false;
  }
});

// Routes

app.get('/', routes.product.all);
app.get('/products/:id', routes.product.single);

app.get('/cart', routes.cart.all);
app.put('/cart', routes.cart.insert);
app.del('/cart', routes.cart.remove);

app.get('/checkout', routes.checkout.checkout);
app.post('/checkout', routes.checkout.checkout_post);
app.get('/orders', routes.checkout.orders);

app.get('/admin', routes.admin.admin);
app.post('/admin', routes.admin.admin_post);

// Go!

app.listen(config.port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
