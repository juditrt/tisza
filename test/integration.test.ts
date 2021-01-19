

import MockDate from 'mockdate'
import createInvoice from '../src/invoice/create'
import createClient from '../src/szamlazzhu/create-client'

import simpleOrder from './mocks/simple.order'
import simpleConfig from './mocks/simple.config'

const token = 'ABCDEFGHIJK'

describe('integration', () => {

  beforeEach(() => {
    MockDate.set('2020-11-22')
  });

  afterEach(() => {
    MockDate.reset();
  });

  test('simple', async () => {
    const invoice = await createInvoice(simpleOrder, simpleConfig);
    const client = createClient(simpleConfig, token)

    const xml = client._generateInvoiceXML(invoice)

    expect(xml).toMatchSnapshot();
  })
});

