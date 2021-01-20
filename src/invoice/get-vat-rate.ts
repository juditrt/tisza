import countryCodes from '../lib/countrycodes';

export default (order): number|string => {
  const {
    billing_address: {
      company_name,
      country: countryCode,
      vat_number,
    },
  } = order;


  const isEU = countryCodes(countryCode).isEuropean();
  const nonEu = !countryCodes(countryCode).isHungarian() && !countryCodes(countryCode).isEuropean();

  if (company_name && vat_number !== '0' && (isEU || nonEu)) {
    return 'TEHK';
  }

  return 27;
};
