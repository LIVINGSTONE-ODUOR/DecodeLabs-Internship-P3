import Joi from 'joi';

export const contactSchema = Joi.object({
  fullName: Joi.string().trim().max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().trim().max(200).required(),
  message: Joi.string().trim().min(10).max(4000).required()
});
