const validate = require('./validate');
const generate = require('../headers/generate');

module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { subdomain, email, password, token } = options;
  const url = `https://${subdomain}.zendesk.com`;
  const headers = generate({ email, password, token });

  return { url, headers };
};
