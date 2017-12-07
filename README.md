# gatsby-json-parse-bug
Demonstrate [a gatsby.js JSON.parse error](https://github.com/gatsbyjs/gatsby/issues/3148).

# To Reproduce the Error:

Run the `succeed` and `fail` scripts in package.json.

# Error during `build-html` stage:

```
info bootstrap finished - 2.032 s

success Building CSS — 2.078 s
success Building production JavaScript bundles — 5.310 s

error Building static HTML for pages failed

See our docs page on debugging HTML builds for help https://goo.gl/yL9lND


  Error: WebpackError

  - JSON.parse

  - index.js:4 Object.module.exports
    [gatsby-json-parse-bug]/[json-loader]/index.js:4:49

  - From previous event:

  - build-html.js:48 _callee$
    [gatsby-json-parse-bug]/[gatsby]/dist/commands/build-html.js:48:46

  - next_tick.js:131 _combinedTickCallback
    internal/process/next_tick.js:131:7

  - next_tick.js:180 process._tickCallback
    internal/process/next_tick.js:180:9
```

# Race Condition?

If you change the number of records that are used to create pages to something small (like 10), the build succeeds.

**gatsby-node.js:**
```js
exports.createPages = ({ boundActionCreators }) => {
  const { createPage } = boundActionCreators

  const howManyRecords = 100 // <-- change this to 10 and it works fine

  return Promise.all(allJsonMetadata.slice(0, howManyRecords).map(async itemMetadata => {
    const { id: itemId } = itemMetadata
    return createPage({
      path: `/fromjson/${itemId}/`,
      component: pageTemplate,
    })
  }))
}
```
