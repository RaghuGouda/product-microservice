const natsWrapper= require('../nats-wrapper')
const listener = require('../base-listener')
const Products = require('../models/product')



const natsConnect =async ()=>{
    try {
       await natsWrapper.connect('shopping','asjhh','http://nats-srv:4222') 
      const obj = new listener(natsWrapper._client,'add-product','my-cart')
       obj.listen(({parsedData,msg})=>{
        console.log('data',parsedData)
        parsedData.products.forEach(element => {
            const condition = {
                payload: {"quantity":element.quantity},
                productId: element.productId
            }
            try {
                removeProducts(condition)             
            } catch (error) {
                console.log(error)
                
            }
        });
        msg.ack();
      })
      const obj2 = new listener(natsWrapper._client,'update-product','my-UpdateCart')
      obj2.listen(({parsedData,msg})=>{
          console.log("parsedData",parsedData)
      const condition = {
          payload: {"quantity":parsedData.quantity},
          productId: parsedData.productId
        }
      try {
        removeProducts(condition)              
          } catch (error) {
          console.log(error)       
        }
       msg.ack();
     })

     const obj3 = new listener(natsWrapper._client,'remove-product','my-removedCart')
     obj3.listen(({parsedData,msg})=>{
         console.log("parsedData",parsedData)
     const condition = {
         payload: {"quantity":parsedData.quantity},
         productId: parsedData.productId
       }
     try {
       addProduct(condition)              
         } catch (error) {
         console.log(error)       
       }
      msg.ack();
    })

    natsWrapper._client.on('close',()=>{
            console.log('NATS connection Closed!!!');
            process.exit();
    });
        process.on('SIGINT',()=>natsWrapper._client.close())  
        process.on('SIGTERM',()=>natsWrapper._client.close()) 
 } catch (err) {
       console.error(`Error connecting to NATS: ${err}`);  
       }

}
const addProduct = async({payload,productId})=>{
    const productUpdates = Object.keys(payload)
    const product = await Products.findOne({productId})
    if(!product){
        console.log("product",productId)
        return false
    }
    productUpdates.forEach(async(key)=>{
        product[key]+=+ payload[key]
    })  

    await product.save();
    console.log("product in db",await Products.find({})) 
}
async function deleteProduct(productId) {
    try {
      const productToDelete = await Products.findOne({ 'productId': productId });
      if (!productToDelete) {
        console.log(`Product with productId ${productId} not found`);
        return;
      }
      await Products.findOneAndDelete( {'productId': productId });
      console.log(`Product with productId ${productId} successfully deleted`);
    } catch (err) {
      console.error(err);
    }
  }
const removeProducts =async({payload,productId})=>{
    const productUpdates = Object.keys(payload)
    const product = await Products.findOne({productId})
    if(!product){
        console.log("product",productId)
        return false
    }
    productUpdates.forEach(async(key)=>{
        product[key]=product[key] - payload[key]
        if(product[key]==0){
          await deleteProduct(productId) 
        }
    })  

    await product.save();
    console.log("product in db",await Products.find({})) 
}
module.exports = natsConnect
   

