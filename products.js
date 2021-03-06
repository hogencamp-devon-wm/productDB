/*  Control the behavior of our to do products app  */

// Our requires
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/products');

// Create a schema like a blueprint for our data
var productsSchema = new mongoose.Schema({
    brand: String,
    model: String,
    megapixels: Number,
    rating: Number,
    price: Number
});

// Way to connect to mongoose
var Products = mongoose.model('Products', productsSchema);

// Export this for the app.js to call
module.exports = function (app) {
    // When they get the products
    app.get('/products', function (req, res) {
        // Find all items from the database
        Products.find({}, function (err, data) {
            if (err) {
                throw err;
            }
            res.json(data);
        });
    });

    // When they get a specific product
    app.get('/products/:id', function (req, res) {
        console.log("Getting product with product id of " + req.params.id);

        // Find the item with that id in the database
        Products.findById(req.params.id, function (err, data) {
            if (err) {
                throw err;
            }
            res.json(data);
        });
    });

    // When they create a product
    app.post('/products', function (req, res) {
        console.log("Posting a product");

        // Get data from the view and add it to mongodb
        var newProducts = Products(req.body).save(function(err, data) {
            if (err) {
                throw err;
            }
            res.json(data);
        });
    });

    // When they update a product
    app.put('/products/:id', function (req, res) {
        console.log("Updating product with the id of " + req.params.id);

        Products.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
            if (err) {
                throw err;
            }
            res.json(data);
        });
    });

    // When they delete a product
    app.delete('/products/:id', function (req, res) {
        console.log("Deleting product with the id of " + req.params.id);

        Products.findByIdAndRemove(req.params.id, function (err, data) {
            if (err) {
                throw err;
            }
            res.json(data);
        });
    });
};
