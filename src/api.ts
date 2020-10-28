import axios, { AxiosInstance } from 'axios';

export default async (
  url: string,
  token: string,
  client: AxiosInstance = axios.create()
) => {
  const request = await client.get(
    url,
    {
      headers: {
        Authorization: `Token token=${token}`,
        Accept: 'application/json',
      },
    }
  );

  return request.data;
};
