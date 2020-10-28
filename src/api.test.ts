import api from './api';
import axios from 'axios';

jest.mock('axios');

describe('api', () => {
  test('send proper headers', async () => {
    const axiosGet = jest.spyOn(axios, 'get');
    axiosGet.mockImplementation(() => Promise.resolve({ data: 'data' }));

    await api(
      'url',
      'token',
      axios
    );

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      'url',
      {
        headers: {
          Authorization: `Token token=token`,
          Accept: 'application/json',
        },
      }
    );
  });
});
