const productFactory = require('../factory/productFactory')
const productController = {}


productController.addProduct = {
    description: 'Add Products',
    notes: 'Add Products',
    tags: ['api','Products'],
    config:{
        handler: (req,res)=>{
            productFactory.addProduct(req,res)
        }
    }
}

productController.getAllProducts = {
    description: 'Get All Products',
    notes: 'Get All Products',
    tags: ['api','Products'],
    config:{
        handler: (req,res)=>{
            productFactory.getAllProducts(req,res)
        }
    } 
}

productController.deleteProduct = {
    description: 'Delete  Products',
    notes: 'Delete  Products',
    tags: ['api','Products'],
    config:{
        handler: (req,res)=>{
            productFactory.deleteProduct(req,res)
        }
    } 
}

productController.updateProduct = {  
    description: 'Update  Products',
    notes: 'Update  Products',
    tags: ['api','Products'],
    config:{
        handler: (req,res)=>{
            productFactory.updateProduct(req,res)
        }
    } 

}
module.exports = productController;