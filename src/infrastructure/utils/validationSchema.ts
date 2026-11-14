const Joi = require('joi');

export const userValidationSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', "net"] } }).required(),
    password: Joi.string().required()
}).required();



