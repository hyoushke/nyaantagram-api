const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const mongoose = require('mongoose');

const Order = require('../models/orders');
const Product = require('../models/products');
const CheckAuth = require('../middlewares/check-auth');

const OrdersController = require('../controllers/orders');




router.post('/', (req, res, next) => {

    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });


    //Check first if ProductID already exists
    const productId = req.body.productId;
    Product.findById(productId)
    .then(product=>{
                        //if not exists return a Resource nog Found of type Product Resource
                        if(!product){
                            return res.status(404).json({message: 'Product Not Found'});
                        }
                        
                        //if it exists process adding new record
                        //and return the response / promise result of order.save
                        return order.save();
    })
    //re process the result using 
    //another ".then" chain
    //so that it will be outside again
    //it will only have "1" catch
    .then(result=>{
        console.log(result);
        res.status(201).json({
                                message: 'New Order Successfully Created',
                                createdOrder: {id: result._id,
                                                product: result.product,
                                                quantity: result.quantity 
                                            },
                                request: {
                                            type: 'GET',
                                            url: 'http://localhost:3000/orders/' + result._id}              
                                });
    })
    .catch(err=>{
        console.log(err);
        //must also return a response so that api will not wait for too long
        //everything must provide a response
        //product is not found.. then display an error
        res.status(500).json({error: err});
    });






    //res.status(200).json({ message: 'Welcome to Orders Routes via method POST'});
});








router.get('/', CheckAuth, OrdersController.orders_get_all);



router.get('/:orderId', (req, res, next) => {
    const oid = req.params.orderId;
    //res.status(200).json({ message: `Order ${id} was successfully updated`});

    Order.findById(oid)
    .select('_id product quantity')
    .exec()
    .then(doc=>{  
                console.log(doc); 
                //res.status(200).json(doc); 
                const response = {count: 0, orders: {}};
                response.count = 1;
                
                response.orders = {id: doc._id, 
                                    product: doc.product, 
                                    quantity: doc.quantity, 
                                    request: {
                                        type: 'GET',
                                        url: 'http://localhost:3000/orders/' + doc._id
                                    }
                };


                res.status(200).json(response);


    })
    .catch(err=>{console.log(err); res.status(500).json({error: err});});

});

//router.delete('/:orderId', (req, res, next) => {
//    const id = req.params.productId;
//
//    res.status(200).json({ message: `Order ${id} was successfully deleted`});
//
//});

router.delete('/:orderId', (req, res, next) => {
    const oid = req.params.orderId;

    Order.remove({_id: oid})
    .exec()
    .then(result=>{  
                res.status(200).json(result); 
    })
    .catch(err=>{console.log(err); res.status(500).json({error: err});});    

});


module.exports = router;

