const next = require("next");
const dispatch = require("micro-route/dispatch");

const Err = require("./err.js");

/**
 *
 * @param {Object} app A Next.js application instance
 * @param {Object} pag An object describing a custom page
 */
const createHandler = ({ app, page }) => (req, res, { params, query }) =>
  app.render(req, res, page, { ...params, ...query });

/**
 * Verify if a route is not valid
 * @param {Object} route A object describing a custom route
 * @returns {Boolean}    If the route has an invalid shape
 */
const findInvalidRoute = route => {
  if (typeof route !== "object" || Array.isArray(route)) return true;
  return !route.name || !route.path || !route.page;
};

/**
 * Get a Micro request handler to work as a custom Next.js server
 * @param {Array}      routes            The list of routes
 * @param {Object}     [nextConfig = {}] The configuration to use with Next.js
 * @returns {Function}                   A Micro request handler
 */
module.exports = ({ routes, nextConfig = {} }) => {
  if (!routes) throw new Err("The routes must be defined", "missing-routes");

  if (!Array.isArray(routes)) {
    throw new Err("The routes must be an array", "invalid-routes");
  }

  if (typeof nextConfig !== "object") {
    throw new Err(
      "The Next.js configuration must be an object",
      "invalid-next-config"
    );
  }

  if (routes.find(findInvalidRoute)) {
    throw new Err("The routes must be an array", "invalid-routes");
  }

  const app = next(nextConfig);
  const handler = app.getRequestHandler();

  async function setup(requestHandler) {
    await app.prepare();
    return requestHandler;
  }

  const main = routes
    .reduce(
      (dispatcher, { path, page }) =>
        dispatcher.dispatch(path, "GET", createHandler({ app, page })),
      dispatch()
    )
    .otherwise((req, res) => handler(req, res));

  return setup(main);
};
