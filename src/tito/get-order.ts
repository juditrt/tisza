import api from '../api';

export default async (
  account,
  event,
  registration,
  token,
  titoApi = api,
) => {
  const url = `https://api.tito.io/v3/${account}/${event}/registrations/${registration}?view=extended`;

  const data = await titoApi(url, token);

  return data.registration;
};
