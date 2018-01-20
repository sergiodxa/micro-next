# Missing routes

The routes passed as argument of `microNext` is **not optional**.

Example usage:

```js
const routes = [
  {
    path: "/",
    page: "/search",
    name: "search"
  }
];

module.exports = microNext({ routes });
```
