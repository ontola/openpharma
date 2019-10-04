import React from 'react';
import { register } from 'link-redux';

import { previewListTopology } from '../../topologies/PreviewList'
import { NS } from '../../LRS';

const styles = {
  padding: '1em',
};

const PricePreview = ({ standardPrice, occurenceDate }) => (
  <div style={styles}>
    <p>{standardPrice.value}</p>
    <p>{occurenceDate.value}</p>
  </div>
);

PricePreview.type = NS.op('Price');

PricePreview.topology = previewListTopology;

PricePreview.mapDataToProps = {
  standardPrice: {label: NS.op('standardPrice')},
  occurenceDate: {label: NS.op('occurenceDate')},
}

export default register(PricePreview);
