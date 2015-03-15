var express = require('express');
var app = express();
mongoose = require('mongoose');

var server = app.listen(3000, "0.0.0.0", function() {
    console.log('Listening on port %d', server.address().port);
});

//-----------------------------------------------------------------
app.set('views', './views')
app.set('view engine', 'jade')

//-----------------------------------------------------------------
app.use("/css", express.static(__dirname + '/public/css'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/assets", express.static(__dirname + '/public/assets'));


//-----------------------------------------------------------------
app.get('/', function (req, res) {
	res.redirect('/store')
})


app.get('/store', function(req, res){
	res.render('index');
});

app.get('/store/:category', function(req, res){
	res.render('cat');
});

app.get('/store/:category/:product', function(req, res){
	res.render('prod');
});

app.get('/api', function (req, res) {  
  res.send('Nothing to be seen here. API page works.');  
});

//-------------------------------------------------------------------
mongoose.connect('mongodb://localhost/ecommerce');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
});

/*
var Product = new Schema({  
    title: { type: String, required: true },  
    description: { type: String, required: true },  
    style: { type: String, unique: true },  
    modified: { type: Date, default: Date.now }
});
*/

var ProductSchema = new mongoose.Schema(
	{},
	{
		collection: 'products'
	}
	);


var Products = db.model('products', ProductSchema);

//get all products
app.get('/api/products', function (req, res){
  return Products.find(function (err, allProducts) {
    if (!err) {
      return res.send(allProducts);
    } else {
      return console.log(err);
    }
  });
});

//get all products of a category
app.get('/api/products/:id', function (req, res){
  return Products.find({'category' : req.params.id}, function (err, catProducts) {
    if (!err) {
      return res.send(catProducts);
    } else {
      return console.log(err);
    }
  });
});

//get single product with given product_id
app.get('/api/products/product_id/:id', function (req, res){
  return Products.find({'product_id' : req.params.id}, function (err, singleProduct) {
    if (!err) {
      return res.send(singleProduct);
    } else {
      return console.log(err);
    }
  });
});

//-----------------------------------------------------------------

app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});