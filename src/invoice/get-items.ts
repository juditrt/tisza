import roundTo from 'round-to';
import { Buyer } from '../szamlazzhu/types';
import getCateringPerTicket from './get-catering-per-ticket';
import getPropertyByTicketType from './get-property-by-ticket-type';

const getDate = (ticket, config) => {
  if (typeof config.dates === 'undefined') return config.date;

  return getPropertyByTicketType(ticket, 'date', config.dates);
};

export default (order, buyer: Buyer, eventConfig) => order.line_items.reduce((items, ticket) => {
    const {
      price,
      quantity,
      release_title: title,
    } = ticket;

    if (price === 0) {
      return items;
    }

    const vatRate = (buyer.isTEHK) ? 'TEHK' : 27;
    const date = getDate(title, eventConfig);
    const cateringPartial = getCateringPerTicket(title, eventConfig);
    const ticketPartial = roundTo(price - (cateringPartial * 1.27), 2);

		items.push({
      label: title,
      quantity,
      unit: 'qt',
      vat: vatRate,
      grossUnitPrice: ticketPartial, // calculates gross and net values from per item net
      comment: `Ticket for ${eventConfig.label}, ${date}`,
    });

    if (cateringPartial !== 0) {
      items.push({
        label: 'Conference catering fee',
        quantity,
        unit: 'qt',
        vat: vatRate,
        grossUnitPrice: roundTo(cateringPartial * 1.27, 2), // calculates gross and net values from per item net
      });
    }

    return items;
  }, []);
