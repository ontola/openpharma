# OpenPharma

[OpenPharma.eu](http://openpharma.eu) aims to provide insight into how costs of pharmaceuticals differ in various EU countries.

This app was a submission for the [Accountability Hackathon 2019](https://accountabilityhack.nl).

## Why?

Pharmaceutical prices in the EU are determined in a negotiation process between governments and pharmaceutical companies.
During these negotiations, governments look at prices in comparable countries to enhance their bargaining position. 
This project provides standardized data, APIs and a web application that shows how pharmaceutical pricing differs between (EU) countries.

## How it works

First, we converted various pharmaceutical datasets to RDF / [Linked Data](https://ontola.io/what-is-linked-data/).
We create Medicine resources and Price resources, conforming to our hacky [OpenPharma ontology](/Ontology.md).
The prices are standardized to make them comparable.
These resources are stored as [Linked Delta](https://github.com/ontola/linked-delta/) events.
These are added to a Kafka topic and finally replayed by a linked-delta loader, which 
These are made available at the REST endpoitn `https://id.openpharma.eu/${code}`.

### Display
This repo does the rendering, using [link](https://github.com/fletcher91/link-lib/) and react.

## Usage

```bash
# Clone this repo
git clone git@github.com:ontola/openpharma.git && cd openpharma

# Install dependencies
yarn

# Run dev environment
yarn dev
```

Visit [`http://localhost:9000/?resource=http://localhost:9000/devdata/medicine.ttl`](http://localhost:9000/?resource=http://localhost:9000/devdata/medicine.ttl)

Modify the `/dist/devdata/` files to change local mock data.

## Credits

Created during Accountability Hack 2019 @ Tweede Kamer by [Ontola](https://ontola.io).

Since this is a hackathon project built in a couple of hours, don't expect too much :)

- Jurrian Tromp
- Thom van Kalkeren
- Joep Meindertmsa

## License

GPL v3
