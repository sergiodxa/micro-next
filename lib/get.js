const { stringify } = require("querystring");

const Err = require("./err.js");

/**
 * Remove empty keys from query
 * @param {Object} query The query to clear
 * @returns {Object} Cleared query
 */
function clearQuery(query) {
  return Object.entries(query)
    .filter(([, value]) => value !== "")
    .reduce((merged, [key, value]) => ({ ...merged, [key]: value }), {});
}

/**
 * Check if the query is not empty
 * @param {Object} query The query to verify
 * @returns {Boolean} If the query is not empty
 */
function hasQuery(query) {
  return JSON.stringify(query) !== "{}";
}

/**
 * Get the href and as version of a page
 * @param {String} name The name of the page
 * @param {Object} params The parameters of the page
 * @param {Object} query The query to add to the page
 */
function getPage(name, params = {}, query = {}) {
  const route = this.routes.find(route => route.name === name);

  if (!route) {
    throw new Err(
      `Could not found a matching page for ${name}`,
      "unmatching-page-name"
    );
  }

  const { page, path } = route;

  const href = `${page}?${stringify({ ...params, ...clearQuery(query) })}`;

  const as = Object.entries(params)
    .filter(([, value]) => value !== "")
    .reduce(
      (replacedPath, [key, value]) => replacedPath.replace(`:${key}`, value),
      path
    );

  return {
    href,
    as: hasQuery(clearQuery(query))
      ? `${as}?${stringify(clearQuery(query))}`
      : as
  };
}

module.exports = (routes) => {
  getPage.routes = routes;
  return getPage;
}
