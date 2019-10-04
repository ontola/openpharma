import React from 'react';
import { LinkedResourceContainer, register, useLRS } from 'link-redux'
import Link from '../../components/Link'

import PreviewList from '../../topologies/PreviewList'
import { NS } from '../../LRS';
import { Line } from 'react-chartjs-2';
// import { mockdata } from '../../helpers/mockdatachart';
import { generateGraphData } from '../../helpers/generateGraphData';

const styles = {
  padding: '1em',
};

const Medicine = ({
  hasPhoto,
  inbox,
  price,
  name,
  organizationName,
  storage,
  subject,
}) => {
  const lrs = useLRS()
  const prices = lrs.getResourceProperties(subject, NS.op("price"))
    .map(subject => {
      if (!lrs.getResourceProperty(subject, NS.op('standardPrice'))) {
        return null
      }
      return {
        price: Number(lrs.getResourceProperty(subject, NS.op('standardPrice')).value),
        occurenceDate: new Date(lrs.getResourceProperty(subject, NS.op('occurenceDate')).value),
        country: lrs.getResourceProperty(subject, NS.op('country')).value
      }
    })
    .filter(Boolean)
    .reduce((acc, p) => {
      if (!acc[p.country]) {
        acc[p.country] = {
          label: p.country.split('/').pop(),
          data: [],
        }
      }
      acc[p.country].data.push({ x: p.occurenceDate, y: p.price })
      return acc
    }, {});
    console.log(prices)

  return(
    <div style={styles}>
      <h1>{name.value}</h1>
      <Line data={generateGraphData(prices)} />
      {hasPhoto && (
        <img
          src={hasPhoto.value}
          alt="Profile picture"
          style={{
            maxHeight: '8em'
          }}
        />
      )}
      {organizationName && (
        <PropertyDisplayRow label="Inbox">
          {organizationName.value}
        </PropertyDisplayRow>
      )}
      {storage && (
        <PropertyDisplayRow label="Pod">
          <Link to={storage}>
            {storage.value}
          </Link>
        </PropertyDisplayRow>
      )}
      {inbox && (
        <PropertyDisplayRow label="Inbox">
          <Link to={inbox}>
            {inbox.value}
          </Link>
        </PropertyDisplayRow>
      )}
      {price && price.length > 0 && (
        <PreviewList>
          <b>Prijzen</b>
          {price.map((iri) => (
            <LinkedResourceContainer key={iri.value} subject={iri} />
          ))}
        </PreviewList>
      )}
    </div>)
};

Medicine.type = NS.op('Medicine');
Medicine.mapDataToProps = {
  // inbox: { label: new NamedNode('http://www.w3.org/ns/ldp#inbox')},
  price: {
    label: NS.op('price'),
    limit: Infinity,
  },
  name: { label: NS.op('name')},
  dataSubjects: {
    label: NS.op('prices'),
    limit: Infinity,
  }
  // hasPhoto: { label: vcard('hasPhoto')},
  // organizationName: { label: vcard('organization-name')},
  // storage: { label: new NamedNode('http://www.w3.org/ns/pim/space#storage')},
}

export default register(Medicine);
