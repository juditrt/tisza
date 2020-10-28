process.env.TITO_WEBHOOK_TOKEN = 'abcd1234';

import validateRequest from './validate-request';

const reply = {
  badRequest: jest.fn(),
};

describe('request validation', () => {
  afterAll(() => {
    process.env.TITO_WEBHOOK_TOKEN = null;
    delete process.env.TITO_WEBHOOK_TOKEN;
  });

  beforeEach(() => {
    reply.badRequest.mockClear();
  });

  test('validate missing token', () => {
    validateRequest({ query: {} }, reply);

    expect(reply.badRequest).toHaveBeenCalledTimes(1);
  });

  test('validate wrong token', () => {
    validateRequest({ query: { token: 'asd' } }, reply);

    expect(reply.badRequest).toHaveBeenCalledTimes(1);
  });

  test('validate proper token', () => {
    validateRequest({ query: { token: 'abcd1234' } }, reply);

    expect(reply.badRequest).toHaveBeenCalledTimes(0);
  });
});
