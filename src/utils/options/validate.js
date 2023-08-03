require('dotenv').config();

const subdomain = process.env.subdomain;
const email = process.env.email;
const password = process.env.password;
const token = process.env.token;

module.exports = options =>
  Joi.object({
    subdomain: subdomain.required(),
    email: email.required(),
    password,
    token
  })
    .xor('password', 'token')
    .validate(options);
