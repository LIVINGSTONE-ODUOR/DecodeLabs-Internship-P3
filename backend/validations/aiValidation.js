import Joi from 'joi';

export const aiChatSchema = Joi.object({
  message: Joi.string().trim().required(),
  sessionId: Joi.string().uuid().optional()
});
