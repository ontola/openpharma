import React from 'react';
import { register, Property } from 'link-redux';

import { previewListTopology } from '../../topologies/PreviewList'
import { NS } from '../../LRS';
import Link from '../../components/Link';

const styles = {
};

export const priceStringFunc = (price) => `€${price.substring(0, price.length-2)}.${price.slice(-2)}`

const PricePreview = ({ standardPrice, occurenceDate, country }) => {

  const priceString = priceStringFunc(standardPrice.value);

  let countrycode = null;
  switch (country.value) {
    case "http://dbpedia.org/page/Netherlands": {
      countrycode = "NL"
    };
    case "http://dbpedia.org/page/Germany": {
      countrycode =  "DE"
    };
    case "http://dbpedia.org/page/Sweden": {
      countrycode =  "SW"
    };
  };

  return (
    <div style={styles}>
      <p><b>{priceString}</b> op {occurenceDate.value} in <Link to={country}>{countrycode}</Link></p>
    </div>
  )
};

PricePreview.type = NS.op('Price');

PricePreview.topology = previewListTopology;

PricePreview.mapDataToProps = {
  standardPrice: {label: NS.op('standardPrice')},
  occurenceDate: {label: NS.op('occurenceDate')},
  country: {label: NS.op('country')},
}

export default register(PricePreview);
