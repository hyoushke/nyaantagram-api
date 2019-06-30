const Order = require('../models/orders');

exports.orders_get_all = (req, res, next) => {
    //res.status(200).json({ message: 'Welcome to Orders Routes via method GET'});

    Order.find()
    .select('_id product quantity')
    //fetch details of products  using the .populate
    .populate('product', '_id name price imageurl')
    .exec()
    .then(docs=>{  
                console.log(docs); 
                //res.status(200).json(docs); 

                if(docs.length >= 0)
                {
                    const response = {count: 0, orders: {}};
                    response.count = docs.length;
                    
                    response.orders = docs.map(doc=>{
                        return {id: doc._id, 
                                product: doc.product,
                                quantity: doc.quantity,
                                request: {
                                    type: 'GET',
                                    url: 'http://localhost:3000/orders/' + doc._id
                                }
                            }
                    });


                    res.status(200).json(response);
                    //Response.Success(res, object);
                    /*
                    Code 1
                    Description Success
                    Message User Successfully Created
                    Data 
                    Info
                    
                    
                    **/
                }
                else
                {
                    res.status(404).json({message: 'No entries found'});
                    //Response.Fail
                }
    })
    .catch(err=>{console.log(err); res.status(500).json({error: err});});



}