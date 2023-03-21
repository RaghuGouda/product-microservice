const Joi = require('joi')

const product_validations = {
    product_payload: Joi.object({
        productId: Joi.number().required(),
        name: Joi.string().required(),
        category:  Joi.string().required(), 
        price: Joi.number().required(),
        quantity: Joi.number().required()
      }),
    product_updation_payload : Joi.object({
        price: Joi.number(),
        quantity: Joi.number()
    }).unknown(false) 
}
module.exports = product_validations