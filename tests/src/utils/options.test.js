const utilOptions = require('../../../src/utils/options');
const generate = require('../../../src/utils/headers/generate');

describe('util: options', () => {
  let options, validate, prepare;

  beforeEach(() => {
    ({ validate, prepare } = utilOptions);
    options = {
      subdomain: 'subdomain',
      email: 'user@email.com',
      password: 'password',
      token: 'token'
    };
  });

  afterEach(() => {
    options = null;
    validate = null;
    prepare = null;
  });

  describe('index', () => {
    it('should load files', () => {
      expect(validate).toBeTruthy();
      expect(prepare).toBeTruthy();
    });
  });

  describe('validate', () => {
    it('should process a valid options object', () => {
      let error;
      const { subdomain, email, password, token } = options;

      ({ error } = validate({ subdomain, email, password }));
      expect(error).toBeFalsy();

      ({ error } = validate({ subdomain, email, token }));
      expect(error).toBeFalsy();
    });

    it('should fail with missing subdomain', () => {
      const { email, password, token } = options;

      let { error } = validate({ email, password });
      expect(error).toBeTruthy();

      ({ error } = validate({ email, token }));
      expect(error).toBeTruthy();
    });

    it('should fail with missing email', () => {
      let error;
      const { subdomain, password, token } = options;

      ({ error } = validate({ subdomain, password }));
      expect(error).toBeTruthy();

      ({ error } = validate({ subdomain, token }));
      expect(error).toBeTruthy();
    });

    it('should fail with both password and token', () => {
      const { subdomain, email, password, token } = options;

      let { error } = validate({ subdomain, email, password, token });
      expect(error).toBeTruthy();
    });
  });

  describe('prepare', () => {
    it('should prepare url with provided subdomain', () => {
      const { subdomain, email, password } = options;
      const { url } = prepare({ subdomain, email, password });

      expect(url).toBeTruthy();
      expect(url).toEqual(`https://${subdomain}.zendesk.com`);
    });

    it('should prepare headers with provided password', () => {
      const { subdomain, email, password } = options;
      const { headers } = prepare({ subdomain, email, password });
      const genHeaders = generate({ subdomain, email, password });

      expect(headers).toEqual(genHeaders);
    });

    it('should prepare headers with provided token', () => {
      const { subdomain, email, token } = options;
      const { headers } = prepare({ subdomain, email, token });
      const genHeaders = generate({ subdomain, email, token });

      expect(headers).toEqual(genHeaders);
    });

    it('should fail with invalid input', () => {
      let { subdomain, email, password, token } = options;
      expect(() => prepare()).toThrowError();
      expect(() => prepare({})).toThrowError();
      expect(() =>
        prepare({ subdomain, email, password, token })
      ).toThrowError();
    });
  });
});
