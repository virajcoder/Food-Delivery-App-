var library = require("../node-library")(require)

module.exports = library.export(
  "nrtv-module-with-commonjs-requirement",
  ["example"],
  function(example) {
    return {}
  }
)