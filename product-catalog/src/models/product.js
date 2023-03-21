const mongoose = require('mongoose')
const {ResponseMessages,StatusCodes,ErrorHandler} = require('@raghu-shop/common')

const productSchema = new mongoose.Schema({
    productId: {
        type:Number,
        unique: true
    },
    name:{
        type:String,
        trim:true
    },
    category:{
        type:String,
        trim:true
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    image:{
        type:Buffer
    }
},
{timestamps:true}
)

productSchema.statics.createProduct = async(_product)=>{
    try {
        const existingProduct = await Products.findOne({name: _product.name});
        if (existingProduct) throw new ErrorHandler(ResponseMessages.PRODUCT_EXISTS,StatusCodes.BAD_REQUEST)
        const product = new Products(_product)
        if(!product)throw new Error(ResponseMessages.ERROR,StatusCodes.FORBIDDEN)
        await product.save()
        return product;      
    } catch (error) {
        error.status = error.code || StatusCodes.SERVICE_UNAVAILABLE;
        throw error;
    }
}

productSchema.statics.getAllProducts = async()=>{
    try {
        const products = await Products.find({})
        if(!products)throw new Error(ResponseMessages.ERROR,StatusCodes.FORBIDDEN)
        return products;
        
    } catch (error) {
      error.status = error.code || StatusCodes.SERVICE_UNAVAILABLE;
      throw error; 
    }
}

productSchema.statics.removeProduct = async(condition) =>{
    try {
        const product = await Products.findOneAndDelete(condition)
        if(!product)throw new Error(ResponseMessages.ERROR,StatusCodes.FORBIDDEN)
        return product;    
    } catch (error) {
        error.status = error.code || StatusCodes.BAD_REQUEST
        throw error;
    }
}

productSchema.statics.updateProduct = async({payload,productId})=>{
    try {
        const productUpdates = Object.keys(payload)
        const product = await Products.findOne({productId})
        if(!product)throw new Error(ResponseMessages.ERROR,StatusCodes.FORBIDDEN)
        productUpdates.forEach((key)=>product[key]=payload[key])  
        await product.save();
        return product
    } catch (error) {
        error.status = error.code || StatusCodes.BAD_REQUEST
        throw error
    }

}

const Products = mongoose.model('Products',productSchema)

module.exports = Products