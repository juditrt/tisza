import checkVIES from './check-vies';

describe('check VIES', () => {
  test('returns promise', () => {
    const value = checkVIES('HU', 'HU25966330');

    expect(value).toBeInstanceOf(Promise);
  });

  test('promise resolve true', async () => {
    const value = await checkVIES('HU', '25966330');

    expect(value).toBe(true);
  });
});
