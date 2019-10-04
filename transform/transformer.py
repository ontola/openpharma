import csv
import json
import copy
import datetime
from rdflib import Graph, URIRef, Literal
import rdflib

default_ns_iri = 'http://openpharma.eu/ns/op/'
norway_ns_iri = 'http://openpharma.eu/ns/norway/'
nl_ns_iri = 'http://openpharma.eu/ns/netherlands/'

rdf_namespace = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
id_namespace = 'http://id.openpharma.eu/'


# store = Store()
# store.context_aware = True


g = Graph()


def convert_to_camelcase(s):
    if len(s) == 0:
        return
    s1 = ''
    s1 += s[0].upper()
    for i in range(1, len(s)):
        if (s[i] == ' '):
            s1 += s[i + 1].upper()
            i += 1
        elif (s[i - 1] != ' '):
            s1 += s[i]
    return s1


def deepupdate(target, src):
    """Deep update target dict with src
    For each k,v in src: if k doesn't exist in target, it is deep copied from
    src to target. Otherwise, if v is a list, target[k] is extended with
    src[k]. If v is a set, target[k] is updated with v, If v is a dict,
    recursively deep-update it.

    Examples:
    >>> t = {'name': 'Ferry', 'hobbies': ['programming', 'sci-fi']}
    >>> deepupdate(t, {'hobbies': ['gaming']})
    >>> print t
    {'name': 'Ferry', 'hobbies': ['programming', 'sci-fi', 'gaming']}
    """
    for k, v in src.items():
        if type(v) == list:
            if not k in target:
                target[k] = copy.deepcopy(v)
            else:
                target[k].extend(v)
        elif type(v) == dict:
            if not k in target:
                target[k] = copy.deepcopy(v)
            else:
                deepupdate(target[k], v)
        elif type(v) == set:
            if not k in target:
                target[k] = v.copy()
            else:
                target[k].update(v.copy())
        else:
            target[k] = copy.copy(v)

def first_normalization():
    datasets = [
        ('datasets/openstate artikelen.csv', None, ',', nl_ns_iri),
        ('datasets/Norway Package prices 2019-02-01.csv', '2019-02-01', ';', norway_ns_iri),
        ('datasets/Norway Package prices 2019-03-01.csv', '2019-03-01', ';', norway_ns_iri),
        ('datasets/Norway package prices 2019-09-02.csv', '2019-09-02', ';', norway_ns_iri),
        ('datasets/Norway Package prices 2019-10-01.csv', '2019-10-01', ';', norway_ns_iri),
    ]

    global_set = []
    for dataset in datasets:
        with open(dataset[0]) as csv_file:
            dict_reader = csv.DictReader(csv_file, delimiter=dataset[2])
            for row in dict_reader:
                new_row = {}
                for column, value in row.items():
                    predicate = dataset[3] + convert_to_camelcase(column.strip())
                    new_row[predicate] = value

                if dataset[1]:
                    new_row[default_ns_iri + 'Date'] = dataset[1]

                if dataset[3] == nl_ns_iri:
                    new_row[default_ns_iri + 'Country'] = 'Netherlands'
                else:
                    new_row[default_ns_iri + 'Country'] = 'Norway'

                new_row[rdf_namespace + 'type'] = default_ns_iri + 'RawProduct'
                new_row[default_ns_iri + 'Identifier'] = row.get('registratienummer') or row.get('MA-number')
                global_set.append(new_row)

    with open('output/first_normalization.json', 'w') as output_file:
        json.dump(global_set, output_file)


def second_normalization():
    mappings = [
        (id_namespace, nl_ns_iri + 'Registratienummer', norway_ns_iri + 'MA-number',)
    ]

    id_key = default_ns_iri + 'Identifier'

    product_set = {}
    with open('output/first_normalization.json', 'r') as json_file:
        json_data = json.load(json_file)

        for raw_product in json_data:
            if raw_product[id_key][0:2] != 'EU':
                continue

            raw_product[rdf_namespace + 'type'] = 'Product'

            try:
                if raw_product[default_ns_iri + 'Country'] == 'Netherlands':
                    price = {
                        default_ns_iri + 'Unit': raw_product.get(nl_ns_iri + 'Eenheid'),
                        default_ns_iri + 'Price': float(raw_product.get(nl_ns_iri + 'Prijs')),
                        default_ns_iri + 'Date': datetime.datetime.strptime(raw_product.get(nl_ns_iri + 'Datum'), "%Y-%m-%d").date(),
                        default_ns_iri + 'Country': raw_product[default_ns_iri + 'Country'],
                    }
                else:
                    price = {
                        default_ns_iri + 'Unit': raw_product.get(norway_ns_iri + 'Unit'),
                        default_ns_iri + 'Price': float(raw_product.get(norway_ns_iri + 'PRP')),
                        default_ns_iri + 'Date': datetime.datetime.strptime(raw_product.get(default_ns_iri + 'Date'), "%Y-%m-%d").date(),
                        default_ns_iri + 'Country': raw_product[default_ns_iri + 'Country'],
                    }

                try:
                    raw_product[default_ns_iri + 'prices'].append(price)
                except KeyError:
                    raw_product[default_ns_iri + 'prices'] = [price]
            except ValueError:
                pass

            try:
                deepupdate(product_set[raw_product[id_key]], raw_product)
            except KeyError:
                product_set[raw_product[id_key]] = raw_product

            #print()


        #print()

    combined_set = []
    for key, value in product_set.items():
        #if value.get(norway_ns_iri + 'MA-holder') and value.get(nl_ns_iri + 'Registratienummer'):

        #    #if len(value[default_ns_iri + 'prices']) > 1:
        #    #    #print()

        combined_set.append(value)

        for predicate, value2 in value.items():
            if type(value2) != list:
                triple_object = rdflib.Literal(value2)
            else:
                rdflib.
            
            g.add((rdflib.URIRef(id_namespace + key), rdflib.URIRef(predicate), triple_object))

    #print()



#first_normalization()
second_normalization()


output = g.serialize(format='turtle')
with open('output/second_normalization.ttl', 'wb') as output_file:
    output_file.write(output)
print()