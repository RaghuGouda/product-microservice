const Products = require('../models/product')
const {Response,ResponseMessages,StatusCodes,verifyId,ErrorHandler} = require('@raghu-shop/common')

const addProduct =  async (req,res) => {
    try {
       const product = await Products.createProduct(req.body)
       res.status(StatusCodes.CREATED).json(Response.sendResponse(true,product,ResponseMessages.SUCCESS,StatusCodes.CREATED))     
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(Response.sendResponse(false,null,err.message || ResponseMessages.ERROR,StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

const getAllProducts = async (req,res)=>{
    try {
        const products = await Products.getAllProducts()
        res.status(StatusCodes.OK).json(Response.sendResponse(true,products,ResponseMessages.SUCCESS,StatusCodes.OK))     
    } catch (err) {
        res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(Response.sendResponse(false,null,err.message || ResponseMessages.ERROR,err.status || StatusCodes.INTERNAL_SERVER_ERROR))
    } 
}

const deleteProduct = async(req,res) =>{
    const condition = {
        productId: req.params.product_id
    }
    try {
        // if(!await verifyId(req.params.product_id))throw new ErrorHandler(ResponseMessages.INVALID_ID,StatusCodes.BAD_REQUEST)
       const product = await Products.removeProduct(condition)
       res.status(StatusCodes.OK).json(Response.sendResponse(true,product,ResponseMessages.SUCCESS,StatusCodes.OK))   
    } catch (err) {
        res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(Response.sendResponse(false,null,err.message || ResponseMessages.ERROR,err.status || StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

const updateProduct = async(req,res)=>{  
    const condition = {
        payload: req.body,
        productId: req.params.product_id
    }
try {
    // if(!await verifyId(req.params.product_id))throw new ErrorHandler(ResponseMessages.INVALID_ID,StatusCodes.BAD_REQUEST)
    const product = await Products.updateProduct(condition)
    res.status(StatusCodes.OK).json(Response.sendResponse(true,product,ResponseMessages.SUCCESS,StatusCodes.OK))   
} catch (err) {
    res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(Response.sendResponse(false,null,err.message || ResponseMessages.ERROR,err.status || StatusCodes.INTERNAL_SERVER_ERROR))
}
}

module.exports ={
    addProduct,
    getAllProducts,
    deleteProduct,
    updateProduct
}