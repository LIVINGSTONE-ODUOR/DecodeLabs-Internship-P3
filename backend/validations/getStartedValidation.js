import Joi from 'joi';

export const getStartedSchema = Joi.object({
  fullName: Joi.string().trim().max(100).required(),
  email: Joi.string().email().required(),
  companyName: Joi.string().trim().max(150).allow('', null),
  serviceInterestedIn: Joi.string().valid('web-development', 'software-installation', 'it-support', 'consulting', 'ai-assistant', 'other').required(),
  projectDescription: Joi.string().trim().min(20).max(4000).required(),
  budget: Joi.string().valid('under-5k', '5k-15k', '15k-50k', '50k+', 'not-sure').default('not-sure'),
  timeline: Joi.string().valid('immediate', '1-month', '1-3-months', '3-6-months', 'flexible').default('flexible')
});
