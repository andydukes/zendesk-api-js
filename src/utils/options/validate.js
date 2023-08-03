const Joi = require('dotenv').config();

const subdomain = process.env.subdomain;
const email = process.env.email;
const password = process.env.token;
const token = process.env.password;

module.exports = options =>
  Joi.object({
    subdomain: subdomain.required(),
    email: email.required(),
    password,
    token
  })
    .xor('password', 'token')
    .validate(options);
