import React from 'react';

import { Container } from 'reactstrap';

import { Typeahead } from 'react-bootstrap-typeahead';
const options = [
  {
    name: 'Alabama',
    population: 4780127,
    capital: 'Montgomery',
    region: 'South'
  },
  { name: 'Alaska', population: 710249, capital: 'Juneau', region: 'West' },
  { name: 'Arizona', population: 6392307, capital: 'Phoenix', region: 'West' },
  {
    name: 'Arkansas',
    population: 2915958,
    capital: 'Little Rock',
    region: 'South'
  },
  {
    name: 'California',
    population: 37254503,
    capital: 'Sacramento',
    region: 'West'
  },
  { name: 'Colorado', population: 5029324, capital: 'Denver', region: 'West' },
  {
    name: 'Connecticut',
    population: 3574118,
    capital: 'Hartford',
    region: 'Northeast'
  },
  { name: 'Delaware', population: 897936, capital: 'Dover', region: 'South' },
  {
    name: 'Florida',
    population: 18804623,
    capital: 'Tallahassee',
    region: 'South'
  },
  { name: 'Georgia', population: 9688681, capital: 'Atlanta', region: 'South' },
  { name: 'Hawaii', population: 1360301, capital: 'Honolulu', region: 'West' },
  { name: 'Idaho', population: 1567652, capital: 'Boise', region: 'West' },
  {
    name: 'Illinois',
    population: 12831549,
    capital: 'Springfield',
    region: 'Midwest'
  },
  {
    name: 'Indiana',
    population: 6484229,
    capital: 'Indianapolis',
    region: 'Midwest'
  },
  {
    name: 'Iowa',
    population: 3046869,
    capital: 'Des Moines',
    region: 'Midwest'
  },
  { name: 'Kansas', population: 2853132, capital: 'Topeka', region: 'Midwest' },
  {
    name: 'Kentucky',
    population: 4339349,
    capital: 'Frankfort',
    region: 'South'
  },
  {
    name: 'Louisiana',
    population: 4533479,
    capital: 'Baton Rouge',
    region: 'South'
  },
  {
    name: 'Maine',
    population: 1328361,
    capital: 'Augusta',
    region: 'Northeast'
  },
  {
    name: 'Maryland',
    population: 5773785,
    capital: 'Annapolis',
    region: 'South'
  },
  {
    name: 'Massachusetts',
    population: 6547817,
    capital: 'Boston',
    region: 'Northeast'
  },
  {
    name: 'Michigan',
    population: 9884129,
    capital: 'Lansing',
    region: 'Midwest'
  },
  {
    name: 'Minnesota',
    population: 5303925,
    capital: 'Saint Paul',
    region: 'Midwest'
  },
  {
    name: 'Mississippi',
    population: 2968103,
    capital: 'Jackson',
    region: 'South'
  },
  {
    name: 'Missouri',
    population: 5988927,
    capital: 'Jefferson City',
    region: 'Midwest'
  },
  { name: 'Montana', population: 989417, capital: 'Alberta', region: 'West' },
  {
    name: 'Nebraska',
    population: 1826341,
    capital: 'Lincoln',
    region: 'Midwest'
  },
  {
    name: 'Nevada',
    population: 2700691,
    capital: 'Carson City',
    region: 'West'
  },
  {
    name: 'New Hampshire',
    population: 1316466,
    capital: 'Concord',
    region: 'Northeast'
  },
  {
    name: 'New Jersey',
    population: 8791936,
    capital: 'Trenton',
    region: 'Northeast'
  },
  {
    name: 'New Mexico',
    population: 2059192,
    capital: 'Santa Fe',
    region: 'West'
  },
  {
    name: 'New York',
    population: 19378087,
    capital: 'Albany',
    region: 'Northeast'
  },
  {
    name: 'North Carolina',
    population: 9535692,
    capital: 'Raleigh',
    region: 'South'
  },
  {
    name: 'North Dakota',
    population: 672591,
    capital: 'Bismarck',
    region: 'Midwest'
  },
  {
    name: 'Ohio',
    population: 11536725,
    capital: 'Columbus',
    region: 'Midwest'
  },
  {
    name: 'Oklahoma',
    population: 3751616,
    capital: 'Oklahoma City',
    region: 'South'
  },
  { name: 'Oregon', population: 3831073, capital: 'Salem', region: 'West' },
  {
    name: 'Pennsylvania',
    population: 12702887,
    capital: 'Harrisburg',
    region: 'Northeast'
  },
  {
    name: 'Rhode Island',
    population: 1052931,
    capital: 'Providence',
    region: 'Northeast'
  },
  {
    name: 'South Carolina',
    population: 4625401,
    capital: 'Columbia',
    region: 'South'
  },
  {
    name: 'South Dakota',
    population: 814191,
    capital: 'Pierre',
    region: 'Midwest'
  },
  {
    name: 'Tennessee',
    population: 6346275,
    capital: 'Nashville',
    region: 'South'
  },
  { name: 'Texas', population: 25146105, capital: 'Austin', region: 'South' },
  {
    name: 'Utah',
    population: 2763888,
    capital: 'Salt Lake City',
    region: 'West'
  },
  {
    name: 'Vermont',
    population: 625745,
    capital: 'Montpelier',
    region: 'Northeast'
  },
  {
    name: 'Virginia',
    population: 8001045,
    capital: 'Richmond',
    region: 'South'
  },
  {
    name: 'Washington',
    population: 6724543,
    capital: 'Olympia',
    region: 'West'
  },
  {
    name: 'West Virginia',
    population: 1853011,
    capital: 'Charleston',
    region: 'South'
  },
  {
    name: 'Wisconsin',
    population: 5687289,
    capital: 'Madison',
    region: 'West'
  },
  { name: 'Wyoming', population: 563767, capital: 'Cheyenne', region: 'West' }
];

export default function LivePreviewExample() {
  return (
    <>
      <Container>
        <div className="p-5">
          <Typeahead
            id="typeID2"
            labelKey="name"
            multiple={true}
            defaultSelected={options.slice(0, 2)}
            options={options}
            placeholder="Choose a state..."
          />
        </div>
      </Container>
    </>
  );
}
