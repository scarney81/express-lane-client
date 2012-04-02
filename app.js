var express = require('express')
  , routes = require('./routes')
  , port = (process.env.PORT || 3000);
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
  app.use(express.session());
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

// Routes

app.get('/', routes.products);
app.get('/products/:id', routes.product);

app.get('/cart', routes.cart);
app.put('/cart', routes.add_to_cart);
app.del('/cart', routes.add_to_cart);

app.get('/checkout', routes.checkout);
app.post('/checkout', routes.checkout_post);

app.get('/orders', routes.orders);
app.get('/admin', routes.admin);

// Go!

app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
