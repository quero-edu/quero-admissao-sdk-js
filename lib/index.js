const Joi = require('joi'),
  Client = require('./client'),
  envs = require('./environments');

module.exports = function (config = {}) {
	const {
    environment,
    api_token
  } = Joi.attempt(
		config, 
		Joi.object().required().keys({
      environment: Joi.string().default('production').valid(['production', 'development']),
      api_token: Joi.string().required()
		})
  );
  
  return new Client({
    ...envs[environment],
    api_token
  });
};
