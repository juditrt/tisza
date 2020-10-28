export default {
  querystring: {
    type: 'object',
    required: ['token'],
    properties: {
      token: { type: 'string' },
    },
  },
  headers: {
    type: 'object',
    required: ['tito-signature'],
    properties: {
      'tito-signature': { type: 'string' },
    },
  },
};
