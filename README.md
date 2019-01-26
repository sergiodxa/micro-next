# micro-next

Integrations between Micro and Next.js.

<a href="https://www.patreon.com/sergiodxa">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## Usage

Install it from npm:

```bash
yarn add micro-next
```

Create a `routes.json` file with a list of pages, similar to this one:

```json
[
  {
    "method": "GET",
    "path": "/blog",
    "page": "/blog/posts",
    "name": "blog-posts"
  },
  {
    "method": "GET",
    "path": "/blog/:post",
    "page": "/blog/post",
    "name": "blog-post"
  }
]
```

Create a `server.js` file with the following code:

```js
const routes = require("./routes.json");
const microNext = require("micro-next");

module.exports = microNext({
  routes,
  next: {
    dev: process.env.NODE_ENV !== "production"
  }
});
```

And if you want to easily integrate this client side create a `lib/get-page.js` file with the following content:

```js
import get from "micro-next/get";
import routes from "../routes.json";

export default get(routes);
```

Now you can use it with `next/link`:

```js
import Link from "next/link";
import getPage from "lib/get-page.js";

export default () => (
  <Link {...getPage("blog-post", { post: 1 })}>
    <a>Go to blog post 1</a>
  </Link>
);
```

## API

### `micro-next`

A function used to initialize a Next.js custom server with Micro.

* `routes` (`array`) The list of custom routes
* `next` (`object`) A Next.js [configuration object](https://github.com/zeit/next.js#custom-server-and-routing)

It returns a Micro-ready request handler which run `app.prepare` and setup the routes.

### `micro-next/get`

A function used to get the routes by the name already formated to be used with `next/link`.

* `routes` (`array`) The list of custom routes

This function returns a new function you can export and use to get the `href` and `as` to pass to `next/link`.

* `pageName` (`string`) The name of route as defined in your list of routes
* `params` (`object`) The parameters to use in the URL
* `query` (`object`) The query to add in the URL (default `{}`)

The function returns an object with the following data:

* `href` (`string`) The real path of the URL
* `as` (`as`) The URL to show in the browser
