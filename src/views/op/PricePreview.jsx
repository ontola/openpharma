import React from 'react';
import { register, Property } from 'link-redux';

import { previewListTopology } from '../../topologies/PreviewList'
import { NS } from '../../LRS';
import Link from '../../components/Link';

const styles = {
};

const PricePreview = ({ standardPrice, occurenceDate, country }) => {

  const priceString = `€${standardPrice.value.substring(0, standardPrice.value.length-2)}.${standardPrice.value.slice(-2)}`
  const countryString = new URL(country.value).pathname;

  return (
    <div style={styles}>
      <p><b>{priceString}</b> op {occurenceDate.value} in <Link to={country}>{countryString}</Link></p>
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
