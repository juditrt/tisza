/* eslint-disable no-useless-concat */
import crypto from 'crypto';

export default async (request, reply) => {
  // if (process.env.NODE_ENV !== 'production') return;

  const signature = request.headers['tito-signature'];

  const hmac = crypto
    .createHmac('sha256', request.eventConfig['tito-token'])
    .update(request.rawBody)
    .digest('base64');

  if (signature !== hmac) {
    reply.notAcceptable();
    console.error(`Tito signature STILL CANNOT BE VERIFIED "${signature}"`);
    console.error('hmac', hmac);
    console.error('raw body', request.rawBody);
  }
};
