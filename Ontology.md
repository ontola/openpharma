# OpenPharma ontology

The OpenPharma ontology describes how various medicine relate to each other.
The base URL is `http://openpharma.eu/ns/op/`.
The recommended prefix is `op`.

## Medicine

A medicine refers to a specific molecule.

Props:

- name (literal lang string): The
- description (literal lang string):
- atc5 (literal string): ATC5 identifier.
- prices (RDF Lise): Refers to a list of [op:Prices](#Prices).

## Price

A singe instance of a price occurence for a medicine in one country.

- country (URL, Preferably the DBpedia country): Where the price occured.
- medicine (URL, [op:Medicine](#Medicine) instance): The Medicine that the Price is for.
- occurenceDate (literal ISO date):
- standardPrice (literal Integer): Price per Daily Dose (EU standard) in € Cents, at the moment of occurence.
