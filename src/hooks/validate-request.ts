const { TITO_WEBHOOK_TOKEN } = process.env;

export default async (request, reply) => {
  const {
    query: {
      token,
    },
  } = request;

  if (token !== TITO_WEBHOOK_TOKEN) {
    reply.badRequest();
  }
};
