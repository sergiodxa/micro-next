# Invalid routes

The routes passed as argument of `microNext` is not a valid. It **must** be an array filled of object with the following keys:

* `name` (`string`) the name of the page used to identify it
* `path` (`string`) the path of the custom route
* `page` (`string`) the JS file used for the page

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
