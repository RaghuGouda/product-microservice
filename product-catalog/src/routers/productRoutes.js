const express = require('express');

 const {auth,validate} = require('@raghu-shop/common');

const product_validations = require('../validations/product_validations')

 const productController = require('../controllers/productController');

const productRoutes = new express.Router()


productRoutes.route('/api/product/create').post(auth,validate(product_validations.product_payload),(req,res) => {productController.addProduct.config.handler(req,res) })
productRoutes.route('/api/product/products').get(auth,(req,res)=>{productController.getAllProducts.config.handler(req,res)})
productRoutes.route('/api/product/:product_id').delete(auth,(req,res)=>{productController.deleteProduct.config.handler(req,res)})
productRoutes.route('/api/product/:product_id').patch(auth,validate(product_validations.product_updation_payload),(req,res) => {productController.updateProduct.config.handler(req,res)})
module.exports = productRoutes;