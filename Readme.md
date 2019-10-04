# OpenPharma

OpenPharma.eu a web applicatie to provide insight into how costs of pharmaceuticals differ in various EU countries.
This app is a submission for the [Accountability Hackathon 2019](https://accountabilityhack.nl).

## Ontology

It uses the (quirky, hacky) [hier te zien is](/Ontology.md).

## About the tech

We convert various datasets to RDF / Linked Data.
These are available at

## Usage

```sh
// Clone this repo
git clone git@github.com:ontola/openpharma.git && cd openpharma
// Install dependencies
yarn
// Run dev environment
yarn dev
```

Visit [`http://localhost:9000/?resource=http://localhost:9000/devdata/medicine.ttl`](http://localhost:9000/?resource=http://localhost:9000/devdata/medicine.ttl)

## License

GPL v3
