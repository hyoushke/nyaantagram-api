const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


//Middlewares
const SecurityCheckAuthMiddleware = require('../middlewares/check-auth');
const ProductsFileUploadMiddleware = require('../middlewares/productsFileUploadMiddleware');

//Controllers
const ProductsController = require('../controllers/productsController');




/**
 * @swagger
 * definitions:
 *   Product:
 *     properties:
 *       name:
 *         type: string
 *       price:
 *         type: number
 *       id:
 *         type: number
 */


/**
 * @swagger
 * /products:
 *   get:
 *     description: Get All Products
 *     tags: 
 *      - products 
  *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get All Products
 *         schema:
 *           $ref: '#/definitions/Product'
 */
router.get('/', ProductsController.getAllProducts);


/**
 * @swagger
 * /products:
 *   post:
 *     description: Create New Product
 *     tags: 
 *      - products 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name of the product
 *         in: body
 *         required: true
 *         type: string 
 *     responses:
 *       200:
 *         description: Create New Product
 *         schema:
 *           $ref: '#/definitions/Product'
 */

router.post('/', SecurityCheckAuthMiddleware, ProductsFileUploadMiddleware.uploadSingle('imageurl'), ProductsController.createProduct);

router.get('/', ProductsController.getAllProducts);

router.get('/:productId', ProductsController.getProduct);

router.patch('/:productId', ProductsController.updateProduct);

router.delete('/:productId', ProductsController.removeProduct);



module.exports = router;

