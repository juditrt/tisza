import validateVat from 'validate-vat';

export default async (countryCode: string, vatId: string) : Promise<boolean> => new Promise((resolve, reject) => {
  let vatNumber = vatId;
  const rgx = new RegExp(`^${countryCode}`, 'gi');

  if (rgx.test(vatNumber)) {
    vatNumber = vatNumber.replace(rgx, '');
  }

  vatNumber = vatNumber.trim();

  validateVat(countryCode, vatNumber, 120 * 1000, (err, validationInfo) => {
    if (err) reject(err);

    resolve(validationInfo.valid);
  });
});
