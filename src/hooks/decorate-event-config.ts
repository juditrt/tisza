export default (request, reply) => {
  const event = request?.body?.event?.slug ?? null;

  if (event == null || typeof request.eventsConfigList[event] == 'undefined') {
    reply.badRequest();
    return;
  }

  request.eventConfig = request.eventsConfigList[event];
};
