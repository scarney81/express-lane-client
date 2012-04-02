var express = require('express')
  , routes = require('./routes')
  , config = {
      port: (process.env.PORT || 3000),
      secret: (process.env.SECRET || 'i can haz sekrets?')
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

app.get('/', routes.products);
app.get('/products/:id', routes.product);

app.get('/cart', routes.cart);
app.put('/cart', routes.add_to_cart);
app.del('/cart', routes.remove_from_cart);

app.get('/checkout', routes.checkout);
app.post('/checkout', routes.checkout_post);

app.get('/orders', routes.orders);

app.get('/admin', routes.admin);
app.post('/admin', routes.admin_post);

// Go!

app.listen(config.port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
