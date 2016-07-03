
var
    router = require('express').Router();

module.exports = function configureRouter() {

    router.route('/products')
        .get(getProduct)
        .post(postProduct);

    //router.route('/products/:id')
    //    .get(product.getProduct)
    //    .put(authHandler, product.putProduct)
    //    .delete(authHandler, product.deleteProduct);
    //
    //router.route('/users')
    //    .post(user.postUser);
    //
    //router.route('/users/:id')
    //    .delete(user.deleteUser);

    return router;

    function getProduct(req, res) {
        res.json({testObject: true});


    }

    function postProduct(req, res) {
        res.send('postProduct');
    }
};