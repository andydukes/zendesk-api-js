const zdApi = require('../');

describe('zdApi', () => {
  let folder, endpoint, action, options, api;

  beforeEach(() => {
    // Pick API endpoint for testing
    folder = 'support';
    endpoint = 'tickets';
    action = 'list';

    options = {
      subdomain: 'subdomain',
      email: 'test@email.com',
      password: 'password',
      token: 'token'
    };
  });

  afterEach(() => {
    folder = null;
    endpoint = null;
    action = null;
    options = null;
  });

  describe('api loading', () => {
    it(`should prepare to load api "${folder}"`, () => {
      expect(zdApi).toBeTruthy();
      expect(init).toBeTruthy();
      expect(zdApi[folder]).toBeTruthy();
    });
  });

  describe('init', () => {
    it(`should initialize api "${folder}"`, () => {
      const { subdomain, email, password } = options;
      const initialized = init({ subdomain, email, password });

      expect(initialized).toBeTruthy();
      expect(initialized[folder]).toBeTruthy();
      expect(initialized[folder][endpoint]).toBeTruthy();
      expect(initialized[folder][endpoint][action]).toBeTruthy();
    });

    it('should fail with invalid options', () => {
      const { subdomain, email, password, token } = options;

      expect(() => init()).toThrowError();
      expect(() => init({})).toThrowError();
      expect(() => init({ subdomain })).toThrowError();
      expect(() => init({ email })).toThrowError();
      expect(() => init({ password })).toThrowError();
      expect(() => init({ token })).toThrowError();
      expect(() => init({ subdomain, email })).toThrowError();
      expect(() => init({ email, password })).toThrowError();
      expect(() => init({ email, token })).toThrowError();
      expect(() =>
        api.init({ subdomain, email, password, token })
      ).toThrowError();
    });
  });
});
