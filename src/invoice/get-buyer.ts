import getTaxSubject from './get-tax-subject';
import getTaxNumber from './get-tax-number';
import { Buyer } from '../szamlazzhu/types';
import countryCodes from '../lib/countrycodes';
import checkVIES from '../lib/check-vies'

export default async (order) : Promise<Buyer> => {
  const {
    name,
    email,
    company_name,
    billing_address: {
      address,
      city,
      zip_postal_code: zip = '',
      country: countryCode,
      country_name: country,
      state_province_region: state = '',
    },
  } = order;

  const taxNumber = getTaxNumber(order);
  const isEU = countryCodes(countryCode).isEuropean();

  const buyerName = company_name || name;
  const addressWithState = `${address.replace(/[\r]?\n/g, ' ')} ${state}`;

  let isTEHK = false;

  if (company_name && taxNumber && isEU) {
    isTEHK = true;
    try {
      isTEHK = await checkVIES(countryCode, taxNumber);
    } catch (e) {
      console.warn('VIES check failed')
      console.warn(e)
    }
  }


  const data : Buyer = {
    name: buyerName,
    email,
    sendEmail: true,
    country,
    taxNumber,
    taxSubject: getTaxSubject(order),
    zip,
    city,
    address: addressWithState,
    postAddress: {
      name: buyerName,
      zip,
      city,
      address: addressWithState,
    },
    identifier: 1,
    phone: '',
    issuerName: name,
    isTEHK,
  };

  return data;
};
