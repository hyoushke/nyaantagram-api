const ProductsService = require('../services/productsService');
const UtilsMailer = require('../utils/mailer');
const ProductsCreateResponse = require('../response/productCreateResponse');

//goal 
//controllers only accepts req, res, next
//controllers only response with *response*
//controllers will not process anything and will only
//pass data from *req* to services

class Controller {

}

class ProductsController extends Controller{
    static GetAllProducts(){}
}

exports.createProduct = async (req, res, next)=>{
    try
    {
        const procesStart = process.hrtime();
        const name = req.body.name;
        const price = req.body.price;
        const imageurl = req.file.path;

        const productServiceData = await ProductsService.createProduct(name, price, imageurl);
        const jsonResponse = ProductsCreateResponse.SuccessResponse(productServiceData);


        const benchmarkNanoSeconds = process.hrtime(procesStart);
        const benchmarkMiliSecondsPrecise = (benchmarkNanoSeconds[0]*1000) + (benchmarkNanoSeconds[1] / 1000000)
        jsonResponse.benchmark = (benchmarkMiliSecondsPrecise + ' ms');


        res.status(200).json(jsonResponse);
    }
    catch(error)
    {
        res.status(400).json({
            "code": 0,
            "message": "Create Products failed",
            "url": "http://localhost:3000/" + "products",
            "error": error
        })
    }
}

exports.getAllProducts = async (req, res, next)=>{
    try
    {
        const utilsMailer = await UtilsMailer.send_mail();
        const productServiceData = await ProductsService.getAllProducts();

        res.status(200).json(productServiceData);

    }
    catch(error)
    {
        res.status(400).json({
            "code": 0,
            "message": "Fetch Products Failed",
            "url": "http://localhost:3000/" + "products"
        })
    }
}

exports.getProduct = async (req, res, next)=>{
    try
    {
        const productId = req.params.productId;
        const productServiceData = await ProductsService.getProductById(productId);

        res.status(200).json(productServiceData);
    }
    catch(error)
    {
        res.status(400).json({
            "code": 0,
            "message": "Fetch Products Failed",
            "url": "http://localhost:3000/" + "products"
        })
    }
}

exports.updateProduct = async (req, res, next)=>{
    try
    {
        const productId = req.params.productId;
        const productServiceData = await ProductsService.removeProductById(productId);

        res.status(200).json(productServiceData);
    }
    catch(error)
    {
        res.status(400).json({
            "code": 0,
            "message": "Fetch Products Failed",
            "url": "http://localhost:3000/" + "products"
        })
    }
}

exports.removeProduct = async (req, res, next)=>{
    try
    {
        const productId = req.params.productId;
        const productServiceData = await ProductsService.removeProductById(productId);

        res.status(200).json(productServiceData);
    }
    catch(error)
    {
        res.status(400).json({
            "code": 0,
            "message": "Fetch Products Failed",
            "url": "http://localhost:3000/" + "products"
        })
    }
}
