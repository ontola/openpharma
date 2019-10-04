# OpenPharma

OpenPharma.eu a web applicatie to provide insight into how costs of pharmaceuticals differ in various EU countries.

This app was a submission for the [Accountability Hackathon 2019](https://accountabilityhack.nl).

## Why?

This application provides decision makers and politicians with overviews of how pharmaceutical pricing differs between (EU) countries.
This is useful, because it improves the bargaining positions of these officials, which in turn could help drive pharma prices down.

## Ontology

It uses the (quirky, hacky) [OpenPharma Ontology](/Ontology.md).

## About the tech

First, we convert various datasets to RDF / Linked Data.
We create Medicine resources and Price resources.
These are made available at the REST endpoitn `https://id.openpharma.eu/${code}`.
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

- Jurrian Tromp
- Thom van Kalkeren
- Joep Meindertmsa

## License

GPL v3
