import getOrder from './get-order';

const titoApi = jest.fn();

titoApi.mockResolvedValue({ registration: 'reg' });

describe('get tito order', () => {
  test('send and receive proper api request', async () => {
    const result = await getOrder(
      'account',
      'event',
      'registration',
      'token',
      titoApi
    );
    expect(result).toBe('reg');
    expect(titoApi).toHaveBeenCalledWith('https://api.tito.io/v3/account/event/registrations/registration?view=extended', 'token');
  });
});
