const ProductsModel = require('../models/productsModel');
const mongoose = require('mongoose');


exports.getAllProducts = () => {
    
    const products2 = ProductsModel.find()
    .select('_id name price imageurl')
    .exec()
    .then(docs=>{
                if(docs.length >= 0)
                {
                    var products = docs.map(doc=>{
                        return {id: doc._id, 
                                name: doc.name, 
                                price: doc.price, 
                                imageurl: 'http://localhost:3000/uploads' + doc.imageurl, 
                                request: {
                                    type: 'GET',
                                    url: 'http://localhost:3000/products/' + doc._id
                                }
                            }
                    });


                    return products;
                }
    })
    .catch(err=>{console.log(err); return err;});

    return products2;

}

exports.createProduct = async (name, price, imageurl)=>{
   
    const Product = new ProductsModel({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        price: price,
        imageurl: imageurl
    });

    var data = await Product.save()
           .then(result=>{
               const data = 
                            {id: result._id, 
                                name: result.name, 
                                price: result.price, 
                                imageurl: 'http://localhost:3000/' + result.imageurl, 
                                
                            }
               console.log(data);
               return data;
            })
           .catch(err=>{
               console.log(err);
               return err;
            });


            return data;



}



exports.getProductById = (productId)=>{

    var data = ProductsModel.findById(productId)
    .select('_id name price imageurl')
    .exec()
    .then(product=>{  
                console.log(product); 
                
                let data = {count: 0, products: {}};
                data.count = 1;
                data.products = {
                                    id: product._id, 
                                    name: product.name, 
                                    price: product.price, 
                                    imageurl: 'http://localhost/uploads' + product.imageurl
                                };
                                return data;
    })
    .catch(err=>{
        console.log(err);
        return err;
     });


    return data;

}

exports.removeProductById = (productId)=>{

    var data = ProductsModel.findById(productId)
    .select('_id name price imageurl')
    .exec()
    .then(product=>{  
                console.log(product); 
                
                const data = {count: 0, products: {}};
                data.count = 1;
                data.products = {
                                    id: product._id, 
                                    name: product.name, 
                                    price: product.price, 
                                    imageurl: 'http://localhost/uploads' + product.imageurl
                };

                return data;
    
    })
    .catch(err=>{
        console.log(err);
        return err;
     });


    return data;

}












