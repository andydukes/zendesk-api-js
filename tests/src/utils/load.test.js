const load = require('../../../src/utils/load');

// Pick API endpoint for testing
const folder = 'support';
const endpoint = 'tickets';
const action = 'list';

describe('utils: load', () => {
  let options, api;

  beforeEach(() => {
    options = {
      subdomain: 'subdomain',,
      email: 'test@email.com',
      password: 'password',
      token: 'token'
    };

    api = load(folder);
  });

  afterEach(() => {
    options = null;
  });

  describe('load api', () => {
    it(`should load api "${folder}"`, () => {
      const api = load(folder);

      expect(api).toBeTruthy();
      expect(api.init).toBeTruthy();
      expect(api[endpoint]).toBeTruthy();
    });
  });

  describe('init', () => {
    it(`should initialize api "${folder}"`, () => {
      const { subdomain, email, password } = options;
      const initialized = api.init({ subdomain, email, password });

      expect(initialized[endpoint][action]).toBeTruthy();
    });

    it('should fail with invalid options', () => {
      const { subdomain, email, password, token } = options;

      expect(() => api.init()).toThrowError();
      expect(() => api.init({})).toThrowError();
      expect(() => api.init({ subdomain })).toThrowError();
      expect(() => api.init({ email })).toThrowError();
      expect(() => api.init({ password })).toThrowError();
      expect(() => api.init({ token })).toThrowError();
      expect(() => api.init({ subdomain, email })).toThrowError();
      expect(() => api.init({ email, password })).toThrowError();
      expect(() => api.init({ email, token })).toThrowError();
      expect(() =>
        api.init({ subdomain, email, password, token })
      ).toThrowError();
    });
  });
});
