import { graph, parse } from "rdflib";

const F_NTRIPLES = "application/n-triples";
const F_NQUADS = "application/n-quads";
const F_TURTLE = "text/turtle";
const F_N3 = "text/n3";
const F_PLAIN = "text/plain";
const F_JSON = "application/json";
const F_JSONLD = "application/ld+json";
const F_RDF_XML = "application/rdf+xml";
const F_NTRIPLES_DEP = "text/ntriples";
const F_TURTLE_DEP = "application/x-turtle";
const NON_CONTENT_EXTS = ["php", "asp", "aspx", "cgi", "jsp"];

export const processRDF = (store) => async (response) => {
  let data;
  if (response instanceof Response) {
      data = response.bodyUsed ? response.responseText || "" : await response.text();
  }
  else if (response instanceof XMLHttpRequest) {
      data = response.responseText;
  }
  else {
      data = response.body;
  }
  const format = getContentType(response);
  const g = graph();
  await new Promise((resolve) => {
      parse(data, g, getURL(response), format, () => {
          resolve();
      });
  });
  store.addStatements(g.statements)
  return g.statements;
}

function getContentType(res) {
  const contentTypeRaw = getHeader(res, "Content-Type");
  if (contentTypeRaw === undefined || contentTypeRaw === null) {
      return "";
  }
  const contentType = contentTypeRaw.split(";")[0];
  const url = getURL(res);
  const urlMatch = url && new URL(url).href.match(/\.([a-zA-Z0-9]{1,8})($|\?|#)/);
  const ext = urlMatch ? urlMatch[1] : "";
  if (contentType) {
      const matched = contentTypeByMimeString(contentType, ext);
      if (matched) {
          return matched;
      }
  }
  if (ext && !NON_CONTENT_EXTS.includes(ext)) {
      return contentTypeByExtention(ext);
  }
  return contentTypeRaw.split(";")[0];
}

function getHeader(res, header) {
  if (res instanceof Response) {
      return res.headers.get(header);
  }
  else if (typeof XMLHttpRequest !== "undefined" && res instanceof XMLHttpRequest) {
      return res.getResponseHeader(header) || null;
  }
  else if (res && res.headers) {
      const headerValue = res.headers[header];
      return headerValue || null;
  }
  return null;
}

function getURL(res) {
  if (typeof XMLHttpRequest !== "undefined" && res instanceof XMLHttpRequest) {
      return res.responseURL;
  }
  else if ("requestedURI" in res) {
      return res.requestedURI;
  }
  return res.url;
}

function contentTypeByMimeString(contentType, ext) {
  if (contentType.includes(F_NTRIPLES) || contentType.includes(F_NTRIPLES_DEP)) {
      return F_NTRIPLES;
  }
  else if (contentType.includes(F_PLAIN) && ["ntriples", "nt"].indexOf(ext) >= 0) {
      return F_NTRIPLES;
  }
  else if (contentType.includes(F_TURTLE) || contentType.includes(F_TURTLE_DEP)) {
      return F_TURTLE;
  }
  else if (contentType.includes(F_N3)) {
      return F_N3;
  }
  else if (contentType.includes(F_JSONLD)) {
      return F_JSONLD;
  }
  else if (contentType.includes(F_RDF_XML)) {
      return F_RDF_XML;
  }
  return undefined;
}
