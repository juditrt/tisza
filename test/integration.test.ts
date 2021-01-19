
import dedent from 'dedent'
import MockDate from 'mockdate'
import createInvoice from '../src/invoice/create'
import createClient from '../src/szamlazzhu/create-client'

const order = {
  id: 6050550,
  text: 'Test Usaer registered a ticket',
  event: {
    id: 1087445,
    title: 'Integration Test Event 2020',
    url: 'https://ti.to/jsconf-bp/integration-test-event-2020',
    account_slug: 'jsconf-bp',
    slug: 'integration-test-event-2020',
    start_date: null,
    end_date: null,
    metadata: null,
  },
  slug: 'pwNGuU9LWgsHaysSe7qrvOQ',
  reference: 'K0DF',
  currency: 'EUR',
  total: '133.00',
  total_less_tax: '133.00',
  name: 'Szabolcs Szabolcsi-Toth',
  first_name: 'Szabolcs',
  last_name: 'Szabolcsi-Toth',
  email: 'neccccc@gmail.com',
  phone_number: '',
  company_name: 'Teszt Company GMBH',
  discount_code: null,
  payment_reference: null,
  created_at: '2019-12-18T07:52:21.000Z',
  created_date: '2019-12-18',
  completed_at: '2019-12-18T07:52:35.665Z',
  completed_date: '2019-12-18',
  custom: '',
  metadata: null,
  updated_at: '2019-12-18T07:52:35.750Z',
  paid: true,
  line_items: [
    {
      _type: 'line_item',
      id: 6540964,
      title: 'Early Bird',
      created_at: '2019-12-08T21:08:04.000+01:00',
      updated_at: '2019-12-08T21:08:04.000+01:00',
      quantity: 2,
      price: 205.0,
      test_mode: true,
      release_id: 1219124,
      release_slug: 'qqtuetcorjg',
      release_title: 'Early Bird',
    },
  ],
  quantities: {
    qqtuetcorjg: {
      release: 'Early Bird',
      quantity: 1,
    },
  },
  tickets: [],
  payment: {
    reference: null,
    type: 'redirect',
  },
  receipt: {
    number: '0000041',
    total: '133.00',
    tax: 0,
    total_less_tax: '133.00',
    payment_provider: 'PayPal',
    payment_reference: null,
    paid: true,
  },
  billing_address: {
    address: 'Andrássy út 39\r\nUSTREAM Magyarország Kft',
    city: 'Budapest',
    state_province_region: 'Budapest',
    zip_postal_code: '1061',
    country: 'DE',
    country_name: 'Germany',
    vat_number: '234536',
    company_name: 'Teszt Company GMBH',
  },
};


const eventConfig = {
  label: 'JSConf Budapest 2021',
  date: 'September 23, 2020',
  catering: [
    {
      'ticket-name-contains': '*',
      'net-price': 90.3,
    },
  ],
  invoice: {
    "id-prefix": "RF",
    "logo-image": "RF-szamlazzhu.png",
    comment: dedent`
        The invoice includes mediated services.
        Paid in full.
        This document was issued electronically and is therefore valid without signature.`,
    "e-invoice": true,
    currency: "EUR",
  },
  bank: {
    name: 'Raiffeisen Bank, SWIFT: UBRTHUHB',
    accountNumber: 'HU73-1201-0659-0160-2199-0040-0002'
  }
};

const token = 'ABCDEFGHIJK'

describe('integration', () => {

  beforeEach(() => {
    MockDate.set('2020-11-22')
  });

  afterEach(() => {
    MockDate.reset();
  });

  test('basic', async () => {
    const invoice = await createInvoice(order, eventConfig);
    const client = createClient(eventConfig, token)

    const xml = client._generateInvoiceXML(invoice)

    expect(xml).toMatchSnapshot();
  })
});

