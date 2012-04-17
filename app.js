var express = require('express')
  , easyoauth = require('easy-oauth')
  , oauthKeys = require('./oauth/keys_file')
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
    admin: require('./routes/admin'),
    cart: require('./routes/cart'),
    checkout: require('./routes/checkout'),
    product: require('./routes/product')
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
  app.use(easyoauth(oauthKeys))
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
    return req.session.auth.user;
  },

  hasAdminAccess: function(req){
    return req.session.auth.user && req.session.auth.user.username === 'SethCarney';
  }
});

// Routes
routes.product(app, repos.products);
routes.cart(app, repos.cart, repos.products);
routes.checkout(app, repos.cart, repos.orders);
routes.admin(app, repos.orders);

// Go!
app.listen(config.port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
