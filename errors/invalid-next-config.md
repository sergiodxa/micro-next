# Invalid Next.js configuration

The Next.js configuration passed as argument of `microNext` must be an object.

Supported options:

* `dev` (`bool`) whether to launch Next.js in dev mode - default `false`
* `dir` (`string`) where the Next project is located - default `'.'`
* `quiet` (`bool`) Hide error messages containing server information - default `false`
* `conf` (`object`) the same object you would use in next.config.js - default `{}`

Example usage:

```js
const routes = [];

module.exports = microNext({
  routes,
  next: {
    dev: process.env.NODE_ENV !== "production"
  }
});
```
