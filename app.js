var express = require('express')
  , config = {
    port: (process.env.PORT || 3001),
    secret: (process.env.SECRET || 'i can haz sekrets?'),
    serverUrl: (process.env.SERVER_URL || 'http://localhost:3000')
  }
  , repos = {
    cart: new (require('./repositories/cart'))(config),
    orders: new (require('./repositories/orders'))(config),
    products: new (require('./repositories/products'))(config)
  }
  , routes = {
    admin: require('./routes/admin')(repos.orders),
    cart: require('./routes/cart')(repos.cart, repos.products),
    checkout: require('./routes/checkout')(repos.cart, repos.orders),
    product: require('./routes/product')(repos.products)
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

app.get( '/', routes.product.all);
app.get( '/products/:id', routes.product.single);

app.get( '/cart', routes.cart.all);
app.put( '/cart', routes.cart.insert);
app.del( '/cart', routes.cart.remove);

app.get( '/checkout', routes.checkout.checkout);
app.post('/checkout', routes.checkout.checkout_post);
app.get( '/orders', routes.checkout.orders);

app.get( '/admin', routes.admin.admin);
app.post('/admin', routes.admin.admin_post);

// Go!

app.listen(config.port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
