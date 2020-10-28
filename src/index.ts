/* eslint-disable no-process-exit, require-await */
'use strict';

import fastify from 'fastify';
import sensible from 'fastify-sensible';
import helmet from 'fastify-helmet';
import rawBody from 'fastify-raw-body';

import titoSchema from './tito/schema';
import readConfig from './lib/read-config';
import validateRequest from './hooks/validate-request';
import validateTitoPayload from './hooks/validate-tito-payload';
import decorateEventConfig from './hooks/decorate-event-config';
import register from './handlers/register';

const {
  PORT = 8000,
  HOST = '0.0.0.0',
} = process.env;


const server = fastify({
  logger: true,
  ignoreTrailingSlash: true,
});

server.register(sensible);
server.register(helmet);
server.register(rawBody, {
  global: false,
  runFirst: true,
});

server.decorateRequest('eventConfig', {});

server.route({
  method: 'POST',
  url: '/register-purchase',
  config: {
    rawBody: true,
  },
  schema: titoSchema,
  preHandler: async (request, reply) => {
    await decorateEventConfig(request, reply);
    await validateRequest(request, reply);
    await validateTitoPayload(request, reply);
  },
  handler: register,
});

server.route({
  method: 'HEAD',
  url: '/register-purchase',
  config: {
    rawBody: true,
  },
  schema: titoSchema,
  preHandler: async (request, reply) => {
    await validateRequest(request, reply);
  },
  handler: async () => 'ok',
});

const start = async () => {
  try {
    const eventsConfig = await readConfig();

    server.decorateRequest('eventsConfigList', eventsConfig.events);

    console.log(eventsConfig);

    await server.listen(PORT, HOST);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
